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
import ChangePassword from '../Screens/Profile/ChangePassword';
import CompanyProfile from '../Screens/Profile/CompanyProfile';
import MyProfile from '../Screens/Profile/MyProfile';

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

      {/* Profile Sub-screens WITH swipeable layout */}
      <Stack.Screen 
        name="MyProfile" 
        component={withSwipeableWithLayout(MyProfile, { 
          showHeader: true, 
          showBottom: false,
          headerTitle: "My Profile"  
        })} 
      />
      <Stack.Screen 
        name="CompanyProfile" 
        component={withSwipeableWithLayout(CompanyProfile, { 
          showHeader: true, 
          showBottom: false,
          headerTitle: "Company Profile"  
        })} 
      />
      <Stack.Screen 
        name="ChangePassword" 
        component={withSwipeableWithLayout(ChangePassword, { 
          showHeader: true, 
          showBottom: false,
          headerTitle: "Change Password"  
        })} 
      />

      {/* Main Profile screen WITH regular layout */}
      <Stack.Screen 
        name="Profile" 
        component={withLayout(Profile, { 
          showHeader: true, 
          showBottom: false,
          headerTitle: "Profile"  
        })} 
      />
      
      {/* DashBoard WITH swipeable layout */}
      <Stack.Screen 
        name="DashBoard" 
        component={withSwipeableWithLayout(DashBoard, { 
          showHeader: true, 
          showBottom: false,
          headerTitle: "company Name"  
        })} 
      />
    </Stack.Navigator>
  );
};

export default LayoutNavigator;