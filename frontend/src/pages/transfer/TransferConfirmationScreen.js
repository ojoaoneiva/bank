import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../../../config';

const TransferConfirmationScreen = ({ route }) => {
  const { amount, toUserEmail2, userFound } = route.params;
  const navigation = useNavigation();

  const handleConfirm = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const userResponse = await axios.get(`${API_URL}/users/by-token/${token}`);
        const userId = userResponse?.data?.user.user_id;
        const transferData = {
          fromUserId: userId,
          toUserEmail2,
          amount,
        };
        await axios.post(`${API_URL}/account`, transferData);

        const toUserResponse = await axios.get(`${API_URL}/users/email/${toUserEmail2}`);
        const toUserId = toUserResponse?.data.data[0].user_id;
        const transferHistory = {
          fromUserId: userId,
          toUserId,
          amount,
        };
        await axios.post(`${API_URL}/transfer`, transferHistory);

        navigation.navigate('Home');
    } catch (error) {
      console.error('Error in the transfer:', error);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.close} onPress={handleGoBack}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Transferring</Text>
      <Text style={styles.label}>{"$ "}{parseFloat(amount).toFixed(2)}</Text>
      <Text style={styles.subtitle}>To: {userFound}</Text>
      <Text style={styles.subtitle}>Email: {toUserEmail2}</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm Transfer</Text>
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
  title: {
    fontSize: 30,
    marginTop: '40%'
  },
  label:{
    fontSize: 40,
    color: 'black',
    margin: 5 
  },
  subtitle: {
    fontSize: 22,
    marginTop:10,
  },
  close: {
    position: 'absolute',
    top: 20,
    left: 4,
    fontSize:36,
    padding: 10
  }
});

export default TransferConfirmationScreen;