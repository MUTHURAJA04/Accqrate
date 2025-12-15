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
import Onboarding from '../Screens/onboard';
import boardingTerminal from '../Screens/Onboard/boardingTerminal';
import NewTerminal from '../Screens/Onboard/NewTerminal';
import EditTerminal from '../Screens/Onboard/EditTerminal';
import Setup from '../Screens/Setup';
import Mystores from '../Screens/Setups/MyStores';
import NewStore from '../Screens/Setups/NewStore';
import EditStore from '../Screens/Setups/EditStore';
import Customers from '../Screens/Customers';
import NewCustomer from '../Screens/Customers/NewCustomer';
import EditCustomer from '../Screens/Customers/EditCustomer';
import ProductCategories from '../Screens/ProductCategories';
import NewProductCategorie from '../Screens/ProductCategories/NewProductCategorie'; 
import Products from '../Screens/Products';
import NewProduct from '../Screens/Products/NewProduct';
import EditProduct from '../Screens/Products/EditProduct';
import Services from '../Screens/Services';
import NewService from '../Screens/Services/NewService';
import EditService from '../Screens/Services/EditService';
import Terminals from '../Screens/Terminals';
import SetupNewTerminal from '../Screens/Terminals/SetupNewTerminal';
import SetupEditTerminal from '../Screens/Terminals/SetupEditTerminal';
import PaymentMethods from '../Screens/PaymentMethods';
import SalesPerson from '../Screens/SalesPerson';
import NewSalesPerson from '../Screens/SalesPerson/NewSalesPerson';
import EditSalesPerson from '../Screens/SalesPerson/EditSalesPerson';Sales
import Sales from '../Screens/Sales';
import SetupPos from '../Screens/POS/SetupPos';
import Invoice from '../Screens/Invoice';




















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
      <Stack.Screen name="MyProfile" component={withSwipeableWithLayout(MyProfile, {showHeader: true,showBottom: false,headerTitle:"My Profile"})} />
      <Stack.Screen name="CompanyProfile" component={withSwipeableWithLayout(CompanyProfile,{showHeader: true, showBottom: false,headerTitle: "Company Profile"})}/>
      <Stack.Screen name="ChangePassword" component={withSwipeableWithLayout(ChangePassword, { showHeader: true, showBottom: false,headerTitle: "Change Password"})}/>
      {/* Main Profile screen WITH regular layout */}
      <Stack.Screen name="Profile"  component={withSwipeableWithLayout(Profile, { showHeader: true,  showBottom: false,headerTitle: "Profile"  })}/>
      {/* DashBoard WITH swipeable layout */}
      <Stack.Screen name="DashBoard" component={withSwipeableWithLayout(DashBoard, { showHeader: true, showBottom: false,headerTitle: "company Name"  })}/>
      {/* Onboarding WITH swipeable layout */}
      <Stack.Screen name="Onboarding" component={withSwipeableWithLayout(Onboarding, { showHeader: true, showBottom: false,headerTitle: "On-boarding"  })}/> 
      <Stack.Screen name="boardingTerminal"component={withSwipeableWithLayout(boardingTerminal, { showHeader: true, showBottom: false,headerTitle: "On-boarding"  })}/> 
      <Stack.Screen name="NewTerminal"component={withSwipeableWithLayout(NewTerminal, { showHeader: true, showBottom: false,headerTitle: "Create New Terminal"  })}/> 
      <Stack.Screen name="EditTerminal"component={withSwipeableWithLayout(EditTerminal, { showHeader: true, showBottom: false,headerTitle: "Edit Terminal"  })}/> 
      <Stack.Screen name="Setup"component={withSwipeableWithLayout(Setup, { showHeader: true, showBottom: false,headerTitle: "Set-ups"  })}/> 
      <Stack.Screen name="Mystores"component={withSwipeableWithLayout(Mystores, { showHeader: true, showBottom: false,headerTitle: "My Stores"  })}/> 
      <Stack.Screen name="NewStore"component={withSwipeableWithLayout(NewStore, { showHeader: true, showBottom: false,headerTitle: "New Store"  })}/> 
      <Stack.Screen name="EditStore"component={withSwipeableWithLayout(EditStore, { showHeader: true, showBottom: false,headerTitle: "Edit Store"  })}/> 
      <Stack.Screen name="Customers"component={withSwipeableWithLayout(Customers, { showHeader: true, showBottom: false,headerTitle: "Customers"  })}/> 
      <Stack.Screen name="NewCustomer"component={withSwipeableWithLayout(NewCustomer, { showHeader: true, showBottom: false,headerTitle: "New Customer"  })}/> 
      <Stack.Screen name="EditCustomer" component={withSwipeableWithLayout(EditCustomer, { showHeader: true, showBottom: false,headerTitle: "Edit Customer" })}/> 
      <Stack.Screen name="ProductCategories"component={withSwipeableWithLayout(ProductCategories, { showHeader: true, showBottom: false,headerTitle: "Product Categories"  })}/>  
      <Stack.Screen name="NewProductCategorie"component={withSwipeableWithLayout(NewProductCategorie, { showHeader: true, showBottom: false,headerTitle: "New Product Category"  })}/> 
      <Stack.Screen name="Products" component={withSwipeableWithLayout(Products, { showHeader: true, showBottom: false, headerTitle: "Products" })} /> 
      <Stack.Screen name="NewProduct" component={withSwipeableWithLayout(NewProduct, { showHeader: true, showBottom: false, headerTitle: "Add Products" })} /> 
      <Stack.Screen name="EditProduct" component={withSwipeableWithLayout(EditProduct, { showHeader: true, showBottom: false, headerTitle: "Edit Products" })} />   
      <Stack.Screen name="Services" component={withSwipeableWithLayout(Services, { showHeader: true, showBottom: false, headerTitle: "Services" })} /> 
      <Stack.Screen name="NewService" component={withSwipeableWithLayout(NewService, { showHeader: true, showBottom: false, headerTitle: "Add Services" })} /> 
      <Stack.Screen name="EditService" component={withSwipeableWithLayout(EditService, { showHeader: true, showBottom: false, headerTitle: "Edit Services" })} /> 
      <Stack.Screen name="Terminals" component={withSwipeableWithLayout(Terminals, { showHeader: true, showBottom: false, headerTitle: "Terminals" })} /> 
      <Stack.Screen name="SetupNewTerminal" component={withSwipeableWithLayout(SetupNewTerminal, { showHeader: true, showBottom: false, headerTitle: " New Terminal" })} /> 
      <Stack.Screen name="SetupEditTerminal" component={withSwipeableWithLayout(SetupEditTerminal, { showHeader: true, showBottom: false, headerTitle: " Edit Terminal" })} />     
      <Stack.Screen name="PaymentMethods" component={withSwipeableWithLayout(PaymentMethods, { showHeader: true, showBottom: false, headerTitle: "Payment Methods" })} />     
      <Stack.Screen name="SalesPerson" component={withSwipeableWithLayout(SalesPerson, { showHeader: true, showBottom: false, headerTitle: "Sales Person" })} />  
      <Stack.Screen name="NewSalesPerson" component={withSwipeableWithLayout(NewSalesPerson, { showHeader: true, showBottom: false, headerTitle: "New Sales Person" })} />  
      <Stack.Screen name="EditSalesPerson" component={withSwipeableWithLayout(EditSalesPerson, { showHeader: true, showBottom: false, headerTitle: "Edit Sales Person" })} />  
      <Stack.Screen name="Sales" component={withSwipeableWithLayout(Sales, { showHeader: true, showBottom: false, headerTitle: "Choose the Terminal"})}/>
      <Stack.Screen name="SetupPos" component={withSwipeableWithLayout(SetupPos,{ showHeader: true, showBottom: false, headerTitle: "Set-ups"})}/>
      <Stack.Screen name="Invoice"  component={withSwipeableWithLayout(Invoice, { showHeader: true, showBottom: false, headerTitle: "Invoice" })} />  

    </Stack.Navigator>
  );
};

export default LayoutNavigator;