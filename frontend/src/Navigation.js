import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/index';
import LoginScreen from './pages/login';
import SignUp from './pages/signUp';
import TransferAmountScreen from './pages/transfer/TransferAmountScreen';
import TransferToUserScreen from './pages/transfer/TransferToUserScreen';
import TransferConfirmationScreen from './pages/transfer/TransferConfirmationScreen';
import History from './pages/history';
import Advertises from './pages/advertises';
import Profile from './pages/profile';

const Stack = createNativeStackNavigator();

function TransferStack() {
  return (
    <Stack.Navigator initialRouteName="TransferAmountScreen" headerMode="none" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TransferAmountScreen" component={TransferAmountScreen} />
      <Stack.Screen name="TransferToUserScreen" component={TransferToUserScreen} />
      <Stack.Screen name="TransferConfirmationScreen" component={TransferConfirmationScreen} />
    </Stack.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Transfer" component={TransferStack} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Advertises" component={Advertises} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

export default Navigation;