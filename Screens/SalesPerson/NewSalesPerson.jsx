import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/CustomInput';

const NewSalesPerson = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [commission, setCommission] = useState('');

  const handleCreate = () => {
    if (!firstName || !lastName) {
      Alert.alert('Validation Error', 'Please fill in First Name and Last Name');
      return;
    }

    const salesPersonData = {
      firstName,
      lastName,
      phone,
      commission,
      id: Date.now().toString(),
      isEdit: false,
    };

    navigation.navigate('SalesPerson', {
      newSalesPerson: salesPersonData,
    });
    
    setTimeout(() => {
      Alert.alert('Success', 'Sales Person created successfully');
    }, 300);
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-6">

      {/* First Name */}
      <Input
        placeholder="Enter first name"
        value={firstName}
        onChangeText={setFirstName}
      />

      {/* Last Name */}
      <Input
        placeholder="Enter last name"
        value={lastName}
        onChangeText={setLastName}
      />

      {/* Phone Number */}
      <Input
        placeholder="Enter phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {/* Commission */}
      <Input
        placeholder="Enter commission (%)"
        value={commission}
        onChangeText={setCommission}
        keyboardType="numeric"
      />

      {/* Create Button */}
      <TouchableOpacity
        onPress={handleCreate}
        className="bg-blue-600 py-4 rounded-xl mt-8 mb-10"
        activeOpacity={0.8}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Create Sales Person
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default NewSalesPerson;
