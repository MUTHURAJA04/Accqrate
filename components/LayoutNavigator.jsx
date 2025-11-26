import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Layout from '../components/Layout'; // Make sure to import Layout
// Screens
import Landing from '../Screens/Landing';
import Profile from '../Screens/Profile';
import Langauage from '../Screens/Langauage';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Otp from '../Screens/Otp';





const Stack = createNativeStackNavigator();

// Layout wrapper
const withLayout =
  (Component, options = {}) =>
    (props) => (
      <Layout {...options}>
        <Component {...props} />
      </Layout>
    );

const LayoutNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Langauage" component={Langauage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="Profile" component={withLayout(Profile)} />
    
    </Stack.Navigator>
  );
};

export default LayoutNavigator;
