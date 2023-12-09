import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../../config';
import { format, parseISO } from 'date-fns';
import { pt } from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

const History = () => {
  const [showValue, setShowValue] = useState(false);
  const [userName, setUserName] = useState('');
  const [userBalance, setUserBalance] = useState('');
  const [transferHistory, setTransferHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const route = useRoute();

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        const userResponse = await axios.get(`${API_URL}/users/by-token/${token}`);
        const user = userResponse?.data?.user;

        if (user) {
          setUserName(user.name);
        }

        const accountResponse = await axios.get(`${API_URL}/account/${user.user_id}`);
        const account = accountResponse?.data?.data;

        if (account) {
          setUserBalance(account.balance);
        }

        const transfer = await axios.get(`${API_URL}/transfer/${user.user_id}`);
        setTransferHistory(transfer?.data?.data)
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

  const formatDate = (dateString) => {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, 'dd MMM', { locale: pt });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredTransferHistory = transferHistory.filter((item) => {
    const itemUserName =
      item.fromUser.name === userName ? item.toUser.name : item.fromUser.name;
    return (
      itemUserName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (route.params.type === 'incomings'
        ? item.fromUser.name === userName
        : route.params.type === 'expenses'
          ? item.fromUser.name !== userName
          : true)
    );
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.close} onPress={handleGoBack}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>
        {route.params.type === 'incomings' ? 'Incomings ' :
          route.params.type === 'expenses' ? 'Expenses ' : ''}
        History
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Search by name"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        style={styles.list}
        data={filteredTransferHistory.reverse()}
        keyExtractor={(item) => String(item.transfer_id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) =>

          <TouchableOpacity style={styles.item} onPress={() => setShowValue(!showValue)}>
            <View style={styles.content}>
              <View style={styles.areaButton}>
                {item.fromUser.name !== userName ?
                  <FontAwesomeIcon icon={faArrowAltCircleUp} style={styles.icon} size={24} color="#2ecc71" /> :
                  <FontAwesomeIcon icon={faArrowAltCircleDown} style={styles.icon} size={24} color="gray" />
                }
              </View>

              <View style={styles.info}>
                <Text style={styles.label}>{item.fromUser.name === userName ? item.toUser.name : item.fromUser.name}</Text>
                <Text style={styles.date}>{formatDate(item.created_at)}</Text>
              </View>

              <Text
                style={item.fromUser.name !== userName ? styles.value : styles.expences}>
                {item.fromUser.name !== userName ? `$${item.amount}` : `$-${item.amount}`}
              </Text>
            </View>
          </TouchableOpacity>}
      />
    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dadada",
    padding: 25,
  },
  title: {
    fontSize: 30,
    marginTop: '40%'
  },
  item: {
    marginBottom: 24,
    borderBottomWidth: 0.5,
    borderBottomColor: "#dadada",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    marginTop: 2,
    marginBottom: 8
  },
  date: {
    color: "gray",
    fontWeight: "bold",
    textTransform: 'uppercase'
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    textTransform: 'capitalize'
  },
  input: {
    fontSize: 20,
    color: 'black',
    margin: 5
  },
  value: {
    fontSize: 16,
    color: "#2ecc71",
    fontWeight: "bold"
  },
  expences: {
    fontSize: 16,
    color: "gray",
    fontWeight: "bold"
  },
  structure: {
    marginTop: 5,
    width: 80,
    height: 10,
    backgroundColor: "#dadada",
    borderRadius: 8
  },
  list: {
    marginTop: '5%',
    height: "75%",
  },
  text: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  arrowIcon: {
    fontSize: 20,
    color: '#2a7aaf',
  },
  close: {
    position: 'absolute',
    top: 20,
    left: 4,
    fontSize: 36,
    padding: 10
  },
  areaButton: {
    backgroundColor: "#dadada",
    height: 50,
    width: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  info: {
    position: 'absolute',
    left: 80
  }
});

export default History;