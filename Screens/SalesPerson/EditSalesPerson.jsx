import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Input from '../../components/CustomInput';

const EditSalesPerson = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const editSalesPerson = route?.params?.editSalesPerson;

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    commission: '',
  });

  // Pre-fill form with sales person data
  useEffect(() => {
    if (editSalesPerson) {
      setForm({
        firstName: editSalesPerson.firstName || '',
        lastName: editSalesPerson.lastName || '',
        phone: editSalesPerson.phone || '',
        commission: editSalesPerson.commission || '',
      });
    }
  }, [editSalesPerson]);

  const handleUpdate = () => {
    if (!form.firstName || !form.lastName) {
      Alert.alert(
        'Validation Error',
        'Please fill in First Name and Last Name fields',
        [{ text: 'OK' }]
      );
      return;
    }

    const salesPersonId = editSalesPerson?.id || Date.now().toString();
    
    if (!editSalesPerson) {
      Alert.alert(
        'Error',
        'Sales Person data is missing. Cannot update sales person.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    const updatedSalesPerson = {
      ...form,
      id: salesPersonId,
      isEdit: true,
    };
    
    navigation.navigate('SalesPerson', {
      newSalesPerson: updatedSalesPerson
    });
    
    setTimeout(() => {
      Alert.alert(
        'Success',
        'Sales Person updated successfully',
        [{ text: 'OK' }]
      );
    }, 500);
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-6">

      {/* First Name */}
      <Input
        placeholder="Enter first name"
        value={form.firstName}
        onChangeText={(text) => setForm({ ...form, firstName: text })}
      />

      {/* Last Name */}
      <Input
        placeholder="Enter last name"
        value={form.lastName}
        onChangeText={(text) => setForm({ ...form, lastName: text })}
      />

      {/* Phone Number */}
      <Input
        placeholder="Enter phone number"
        value={form.phone}
        onChangeText={(text) => setForm({ ...form, phone: text })}
        keyboardType="phone-pad"
      />

      {/* Commission */}
      <Input
        placeholder="Enter commission (%)"
        value={form.commission}
        onChangeText={(text) => setForm({ ...form, commission: text })}
        keyboardType="numeric"
      />

      {/* Update Button */}
      <TouchableOpacity
        onPress={handleUpdate}
        className="bg-blue-600 py-4 rounded-xl mt-8 mb-10"
        activeOpacity={0.8}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Update Sales Person
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

export default EditSalesPerson;