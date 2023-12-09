import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../config';

export default function Profile({ route }) {
  const navigation = useNavigation();
  const { name, id, email } = route.params;
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [isNameModalVisible, setIsNameModalVisible] = useState(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);


  const updateData = async (body) => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        await axios.put(`${API_URL}/users/by-token/${token}`, body);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const deleteUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        await axios.delete(`${API_URL}/users/by-token/${token}`);
        goToLoginPage()
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleChangeName = async () => {
    const body = { name: newName };
    await updateData(body);
    setIsNameModalVisible(false);
  };

  const handleChangeEmail = async () => {
    const body = { email: newEmail };
    await updateData(body);
    setIsEmailModalVisible(false);
  };

  const goToLoginPage = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.close} onPress={handleGoBack}>
            x
          </Text>
        </TouchableOpacity>
        <View style={styles.info}>
          <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser}>
            <FontAwesomeIcon icon={faUser} size={27} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>id {id}</Text>
            <Text style={styles.subtitle}>Bank - Payment institution</Text>
          </View>
        </View>
        <View style={styles.options}>
          <TouchableOpacity style={styles.option} onPress={() => setIsNameModalVisible(true)}>
            <Text style={styles.subtitle}>Change name</Text>
            <Text style={styles.subtitle}>{'>'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => setIsEmailModalVisible(true)}>
            <Text style={styles.subtitle}>Change email</Text>
            <Text style={styles.subtitle}>{'>'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => setIsDeleteModalVisible(true)}>
            <Text style={styles.subtitle}>Delete Account</Text>
            <Text style={styles.subtitle}>{'>'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.subtitle} onPress={goToLoginPage}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isNameModalVisible}
          onRequestClose={() => setIsNameModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Change Name</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter new name"
                value={newName}
                onChangeText={(text) => setNewName(text)}
              />
              <TouchableOpacity style={styles.modalButton} onPress={handleChangeName}>
                <Text style={styles.modalButtonText}>Change</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsNameModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isEmailModalVisible}
          onRequestClose={() => setIsEmailModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Change Email</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter new email"
                value={newEmail}
                onChangeText={(text) => setNewEmail(text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity style={styles.modalButton} onPress={handleChangeEmail}>
                <Text style={styles.modalButtonText}>Change</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsEmailModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isDeleteModalVisible}
          onRequestClose={() => setIsDeleteModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.modalButton} onPress={deleteUser}>
                <Text style={styles.modalButtonText}>Confirm delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setIsDeleteModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  info: {
    padding: 50,
    backgroundColor: 'rgb(250, 195, 215)',
    flexDirection: 'row',
    paddingTop: 90,
  },
  options: {
    flex: 1,
    padding: 0,
  },
  option: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
    padding: 30,
    fontSize: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  subtitle: {
    fontSize: 20,
  },
  close: {
    fontSize: 30,
    padding: 10,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 15,
    zIndex: 3,
  },
  title: {
    fontSize: 20,
  },
  buttonUser: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    margin: 10,
  },
  actionButton: {
    backgroundColor: '#dadada',
    borderRadius: 5,
    position: 'absolute',
    bottom: 40,
    left: '20%',
    padding: 10,
    width: '70%',
    alignItems: 'center',
    borderRadius: 20,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#dadada',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 16,
  },
});