import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PricingPlans = () => {
  const navigation = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { 
      name: 'Basic', 
      price: '$5', 
      terminals: '1 Terminal'
    },
    { 
      name: 'Standard', 
      price: '$10', 
      terminals: '3 Terminals'
    },
    { 
      name: 'Premium', 
      price: '$15', 
      terminals: '5 Terminals'
    },
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan.name);
    console.log('Selected Plan:', plan);
    
    // Navigate to Payment screen with the selected plan data
    navigation.navigate('Payment', { 
      plan: plan 
    });
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View className="px-6 pt-16 pb-8">
        <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
          Choose Your Plan
        </Text>
        <Text className="text-base text-gray-600 text-center">
          Select the plan that works best for your business
        </Text>
      </View>

      {/* Pricing Cards Section */}
      <View className="flex-1 px-6">
        {plans.map((plan, index) => {
          const isSelected = selectedPlan === plan.name;
          
          return (
            <TouchableOpacity
              key={plan.name}
              onPress={() => handlePlanSelect(plan)}
              activeOpacity={0.8}
              className={`
                rounded-2xl mb-6 p-8 items-center
                ${isSelected 
                  ? 'bg-blue-50 border-2 border-blue-500' 
                  : 'bg-white border border-gray-200'
                }
              `}
            >
              {/* Plan Name */}
              <Text className={`text-2xl font-bold mb-4 ${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>
                {plan.name}
              </Text>

              {/* Price */}
              <Text className={`text-5xl font-bold mb-4 ${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>
                {plan.price}
              </Text>

              {/* Terminals */}
              <Text className={`text-lg font-medium ${isSelected ? 'text-blue-600' : 'text-gray-700'}`}>
                {plan.terminals}
              </Text>

              {/* Selection Indicator */}
              {isSelected && (
                <View className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full items-center justify-center">
                  <Text className="text-white text-xs font-bold">✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default PricingPlans;