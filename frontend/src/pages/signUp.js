import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../config';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function SignUp() {
  const navigation = useNavigation();
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  

  const SignUps = async () => {
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email: email,
        name: name,
        password: password,
      });

      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        Alert.alert('Cadastro realizado com sucesso!', 'Vocecomeçasua conta com R$ 100,00');
        navigation.navigate('Home');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error(error.response.data.message, '. StatusCode:', error.response.data.statusCode);
      } else {
        console.error('Erro desconhecido');
      }
    }
  };

  const goToLoginPage = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <View style={styles.background}></View>
      <Text style={styles.subtitle}>A financial world without complexities</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
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
          placeholder="password"
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
      <TouchableOpacity style={styles.buttonContainer} onPress={SignUps}>
        <Text style={styles.buttonText}>Create account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={goToLoginPage}>
        <Text style={styles.signUpText}>Already have an account? login</Text>
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
  background:{
    backgroundColor: 'rgb(250, 195, 215)',
    width: "100%",
    height: "54%",
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
    padding: 10,
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
