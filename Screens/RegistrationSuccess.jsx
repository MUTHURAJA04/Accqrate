import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { Car } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const RegistrationSuccess = () => {
  const navigation = useNavigation();

  // Calculate trial end date (30 days from now)
  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + 30);
  const formattedDate = trialEndDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <View className="flex-1 bg-white px-6">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Main Content - Centered */}
      <View className="flex-1 justify-center items-center">
        {/* Top Section */}
        <View className="items-center mb-12">
          <Text className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Thanks for the registration
          </Text>
          <Text className="text-lg text-gray-600 mb-2 text-center">
            Your 30 days free trial ends on
          </Text>
          <Text className="text-xl font-semibold text-blue-600">
            {formattedDate}
          </Text>
        </View>

        {/* Pricing Plans Card */}
        <View className="w-full max-w-sm mb-12">
          <TouchableOpacity
            activeOpacity={0.8}
            className="bg-blue-50 rounded-xl border border-blue-200 p-6 flex-row items-center shadow-sm"
            onPress={() => navigation.navigate('PricingPlans')}  
          >
            {/* Car icon */}
            <View className="mr-4">
              <Car size={44} color="#1D4ED8" strokeWidth={1.5} />
            </View>

            {/* Text content */}
            <View className="flex-1">
              <Text className="text-xl font-bold text-gray-900 mb-2">
                Check Pricing Plans
              </Text>
              <Text className="text-base text-gray-600 leading-5">
                Check various plans available and choose the best for you
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Skip Button */}
        <View className="w-full max-w-sm">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('DashBoard')}  
            className="bg-blue-600 rounded-xl py-4 items-center shadow-sm"
          >
            <Text className="text-white text-lg font-semibold">Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegistrationSuccess;