import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/Header';
import Balance from '../components/Balance';
import Moviments from '../components/Moviments';
import Actions from '../components/Actions';
import axios from 'axios';
import { API_URL } from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function Home() {
  const [userName, setUserName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [userBalance, setUserBalance] = useState('');
  const [transferHistory, setTransferHistory] = useState([]);
  const navigation = useNavigation();
  const [showValue, setShowValue] = useState(false);

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        const userResponse = await axios.get(`${API_URL}/users/by-token/${token}`);
        const user = userResponse?.data?.user;

        if (user) {
          setUserName(user.name);
          setId(user.user_id)
          setEmail(user.email)
        }

        const accountResponse = await axios.get(`${API_URL}/account/${user.user_id}`);
        const account = accountResponse?.data?.data;

        if (account) {
          setUserBalance(account.balance);
        }

        const transfer = await axios.get(`${API_URL}/transfer/${user.user_id}`);
        setTransferHistory(transfer?.data?.data.reverse())
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const calculateTotalExpenses = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;

    const totalExpenses = transferHistory
      .filter((transaction) => {
        const transactionDate = new Date(transaction.created_at);
        const transactionMonth = transactionDate.getMonth() + 1;

        return transactionMonth === currentMonth && transaction.fromUser.name === userName;
      })
      .reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

    return totalExpenses.toFixed(2);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'Augost', 'September', 'Octuber', 'November', 'December'
  ];
  const currentMonth = monthNames[new Date().getMonth()];

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleHistory = () => {
    navigation.navigate('History', { type: 'all' });
  }

  const handleAds1 = () => {
    navigation.navigate('Advertises', { type: '1' });
  }
  const handleAds2 = () => {
    navigation.navigate('Advertises', { type: '2' });
  }
  const handleAds3 = () => {
    navigation.navigate('Advertises', { type: '3' });
  }

  return (
    <ScrollView style={styles.container}>
      <Header name={userName} setShowValue={setShowValue} showValue={showValue} id={id} email={email} />
      <Balance saldo={userBalance} showValue={showValue} />
      <Actions name={userName} id={id} email={email} />

      <ScrollView style={styles.advertises} horizontal={true} showsHorizontalScrollIndicator={false}>
        <TouchableOpacity onPress={handleAds1}>
          <Text style={styles.advertising}>
            Increase Your Credit Limit While Your Money Grows </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAds2}>
          <Text style={styles.advertising}>
            Travel with Confidence - Bank Explorer Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAds3}>
          <Text style={styles.advertising}>
            Embrace Cashback Delights with Bank Rewards </Text>
        </TouchableOpacity>

      </ScrollView>
      <View style={styles.fatura}>
        <Text style={styles.text2}> Credit card </Text>
        <Text style={styles.text1}> All expenses on {currentMonth} </Text>
        {showValue ?
          (<Text style={styles.text2}> $ {calculateTotalExpenses()}</Text>)
          :
          (<View style={styles.structure}></View>)
        }

      </View>
      <View style={styles.transactions} >
        <Text style={styles.title}> Latest transactions</Text>

        <TouchableOpacity style={styles.historyButton} onPress={handleHistory}>
          <Text style={styles.buttonText}>View all</Text>
        </TouchableOpacity>
      </View>


      {transferHistory && transferHistory.length > 0
        && (<Moviments data={transferHistory[0]} fromUser={transferHistory[0]?.fromUser?.name} name={userName} />)}
      {transferHistory && transferHistory.length > 1
        && (<Moviments data={transferHistory[1]} fromUser={transferHistory[1]?.fromUser?.name} name={userName} />)}
      {transferHistory && transferHistory.length > 2
        && (<Moviments data={transferHistory[2]} fromUser={transferHistory[2]?.fromUser?.name} name={userName} />)}

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14,
  },
  list: {
    marginStart: 14,
    marginEnd: 14,
  },
  text1: {
    fontSize: 18,
    margin: 14,
    marginTop: 0,
    marginBottom: 0
  },
  text2: {
    fontSize: 18,
    margin: 14,
    fontWeight: 'bold',
  },
  fatura: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dadada",
  },
  structure: {
    marginTop: 24,
    width: 80,
    height: 10,
    backgroundColor: "#dadada",
    borderRadius: 8,
    margin: 18,
  },
  historyButton: {
    width: 60,
    margin: 11,
  },
  transactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    backgroundColor: '#dadada',
    textAlign: 'center',
    padding: 5,
    borderRadius: 10
  },
  advertises: {
    paddingBottom: 20,
  },
  advertising: {
    width: 250,
    backgroundColor: '#dadada',
    margin: 10,
    borderRadius: 10,
    padding: 20,
  }

});