import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { API_URL } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const TransferAmountScreen = ({ navigation, route }) => {
  const [amount, setAmount] = useState('');
  const [userBalance, setUserBalance] = useState('');
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);

  const handleNext = () => {
    navigation.navigate('TransferToUserScreen', { amount });
  };

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        const userResponse = await axios.get(`${API_URL}/users/by-token/${token}`);
        const user = userResponse?.data?.user;
        const accountResponse = await axios.get(`${API_URL}/account/${user.user_id}`);
        const account = accountResponse?.data?.data;
        if (account) {
          setUserBalance(account.balance);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAmountChange = (text) => {
    setAmount(text);
    setIsNextButtonEnabled(text.trim() !== '');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.close} onPress={handleGoBack}>x</Text>
      </TouchableOpacity>
      <Text style={styles.title}>What is the transfer amount</Text>
      <Text style={styles.subtitle}>Available balance in the account ${userBalance}</Text>
      <View style={styles.amount}>
        <Text style={styles.input}>$</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={amount}
          onChangeText={handleAmountChange}
          autoFocus
          keyboardType="numeric"
          keyboardAppearance="dark"
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleNext} disabled={!isNextButtonEnabled}>
        <Text style={amount ? styles.buttonText : styles.buttonText2}>Next Step</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: 'rgb(233, 113, 121)'
  },
  buttonContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: '20%',
    left: '15%',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 18
  },
  buttonText2: {
    color: '#bababa',
    fontSize: 18
  },
  title: {
    fontSize: 30,
    marginTop: '40%'
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10
  },
  input: {
    fontSize: 50,
    color: 'black',
    margin: 5
  },
  amount: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20
  },
  close: {
    position: 'absolute',
    top: 20,
    left: 4,
    fontSize: 30,
    padding: 10
  }
});

export default TransferAmountScreen;