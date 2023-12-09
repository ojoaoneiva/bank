import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from '../../config';

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const Login = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: email,
        password: password,
      });

      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        navigation.navigate('Home');
      } else {
        Alert.alert('Falha no login, Token não encontrado.');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error(error.response.data.message, '. StatusCode:', error.response.data.statusCode);
      } else {
        console.error('Erro desconhecido');
      }
    }
  };

  const goToSignUpPage = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}></View>
      <Text style={styles.subtitle}>A financial world without complexities</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            size={20}
            style={styles.passwordIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={Login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToSignUpPage}>
        <Text style={styles.signUpText}>Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgb(233, 113, 121)',
    paddingBottom: "15%",
  },
  background: {
    backgroundColor: 'rgb(250, 195, 215)',
    width: "100%",
    height: "64%",
    position: 'absolute',
    top: 0,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10
  },
  subtitle: {
    fontSize: 40,
    fontWeight: 'bold',
    position: 'relative',
    right: 10,
    width: '75%',
    paddingBottom: "5%",
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
  },
  passwordInput: {
    flex: 1,
    padding: 10
  },
  passwordIcon: {
    padding: 10,
    color: 'black',
    marginRight: 10
  },
  buttonContainer: {
    backgroundColor: 'white',
    marginTop: 40,
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
  signUpText: {
    fontSize: 18,
    color: 'white',
    paddingTop: "10%",
  },
  infoText: {
    padding: 40,
  }
});