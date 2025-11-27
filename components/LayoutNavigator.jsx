import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Layout from '../components/Layout';
import { withSwipeableWithLayout } from '../components/withSwipeableWithLayout';

// Screens
import Landing from '../Screens/Landing';
import Profile from '../Screens/Profile';
import Langauage from '../Screens/Langauage';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Otp from '../Screens/Otp';
import Companyinfo from '../Screens/Companyinfo';
import RegistrationSuccess from '../Screens/RegistrationSuccess';
import PricingPlans from '../Screens/PricingPlans';
import DashBoard from '../Screens/DashBoard';
import Payment from '../Screens/Payment';

const Stack = createNativeStackNavigator();

// Regular layout wrapper (without swipe)
const withLayout = (Component, options = {}) => (props) => (
  <Layout {...options}>
    <Component {...props} />
  </Layout>
);

const LayoutNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Screens without layout */}
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Langauage" component={Langauage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="Companyinfo" component={Companyinfo} />
      <Stack.Screen name="RegistrationSuccess" component={RegistrationSuccess} />
      <Stack.Screen name="PricingPlans" component={PricingPlans} />
      <Stack.Screen name="Payment" component={Payment} />

      {/* Screens WITH regular layout */}
      <Stack.Screen 
        name="Profile" 
        component={withLayout(Profile, { showHeader: true, showBottom: false })} 
      />
      
      {/* Screens WITH swipeable layout */}
      <Stack.Screen 
        name="DashBoard" 
        component={withSwipeableWithLayout(DashBoard, { showHeader: false, showBottom: false })} 
      />
    </Stack.Navigator>
  );
};

export default LayoutNavigator;