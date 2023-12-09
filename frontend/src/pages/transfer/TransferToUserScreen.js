import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { API_URL } from '../../../config';

const TransferToUserScreen = ({ route }) => {
  const [toUserEmail, setToUserEmail] = useState('');
  const [toUserEmail2, setToUserEmail2] = useState('');
  const [userFound, setUserFound] = useState('');
  const { amount } = route.params;
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('TransferConfirmationScreen', { amount, toUserEmail2, userFound });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAmountChange = async (text) => {
    const trimmedText = text.trim().toLowerCase();

    setToUserEmail(text);
    setIsNextButtonEnabled(trimmedText !== '');
    setToUserEmail2(trimmedText);
    try {
      if (trimmedText) {
        const userResponse = await axios.get(`${API_URL}/users/email/${trimmedText}`);
        const userData = userResponse.data.data;

        if (userData.length > 0) {
          const user = userData[0];
          setUserFound(user.name);
        } else {
          setUserFound('');
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.close} onPress={handleGoBack}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>To whom do you want to transfer ${parseFloat(amount).toFixed(2)}?</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={toUserEmail}
        onChangeText={handleAmountChange}
      />
      {userFound && (<Text style={styles.userFound}>{'User found: '}{userFound}</Text>)}
      <TouchableOpacity style={styles.buttonContainer} onPress={handleNext} disabled={!isNextButtonEnabled}>
        <Text style={userFound ? styles.buttonText : styles.buttonText2}>Next Step</Text>
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
    left: '20%',
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
  userFound: {
    fontSize: 20
  },
  input: {
    fontSize: 30,
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
    fontSize: 36,
    padding: 10
  }
});

export default TransferToUserScreen;