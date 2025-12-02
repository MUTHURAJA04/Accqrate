import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/CustomInput';

const NewCustomer = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    customerCode: '',
    customerName: '',
    notes: '',
    payTerm: '',
    state: '',
    country: '',
    postalCode: '',
    city: '',
    street: '',
    buildingNo: '',
    crNo: '',
    vatNo: '',
    currency: '',
    status: false,
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    if (!form.customerCode || !form.customerName) {
      Alert.alert('Validation Error', 'Please fill in Customer Code and Customer Name');
      return;
    }

    console.log('Form Data Submitted:', form);

    navigation.navigate('Customers', {
      newCustomer: {
        ...form,
        id: Date.now().toString(),
        isEdit: false,
      },
    });

    Alert.alert('Success', 'Customer data saved successfully');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 px-6 pt-6"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* All Inputs */}
          <View className="space-y-4">

            <Input
              placeholder="Customer Code"
              value={form.customerCode}
              onChangeText={(v) => handleChange('customerCode', v)}
            />

            <Input
              placeholder="Customer Name"
              value={form.customerName}
              onChangeText={(v) => handleChange('customerName', v)}
            />

            <Input
              placeholder="Notes"
              value={form.notes}
              onChangeText={(v) => handleChange('notes', v)}
            />

            <Input
              placeholder="Payterm (days)"
              value={form.payTerm}
              onChangeText={(v) => handleChange('payTerm', v)}
              keyboardType="numeric"
            />

            <Input
              placeholder="State / Province"
              value={form.state}
              onChangeText={(v) => handleChange('state', v)}
            />

            <Input
              placeholder="Country"
              value={form.country}
              onChangeText={(v) => handleChange('country', v)}
            />

            <Input
              placeholder="Postal Code"
              value={form.postalCode}
              onChangeText={(v) => handleChange('postalCode', v)}
              keyboardType="numeric"
            />

            <Input
              placeholder="City"
              value={form.city}
              onChangeText={(v) => handleChange('city', v)}
            />

            <Input
              placeholder="Street"
              value={form.street}
              onChangeText={(v) => handleChange('street', v)}
            />

            <Input
              placeholder="Building No."
              value={form.buildingNo}
              onChangeText={(v) => handleChange('buildingNo', v)}
            />

            <Input
              placeholder="CR No."
              value={form.crNo}
              onChangeText={(v) => handleChange('crNo', v)}
            />

            <Input
              placeholder="VAT No."
              value={form.vatNo}
              onChangeText={(v) => handleChange('vatNo', v)}
            />

            <Input
              placeholder="Currency"
              value={form.currency}
              onChangeText={(v) => handleChange('currency', v)}
            />

            {/* Status Toggle */}
            <View className="flex-row items-center justify-between py-4 border-2 border-gray-300 rounded-xl px-4 bg-white">
              <Text className="text-gray-700 text-base">Status</Text>
              <Switch
                value={form.status}
                onValueChange={(value) => handleChange('status', value)}
                trackColor={{ false: '#D1D5DB', true: '#3B82F6' }}
                thumbColor={form.status ? '#FFFFFF' : '#F3F4F6'}
              />
            </View>

          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-600 py-4 rounded-2xl mt-8 mb-10"
            activeOpacity={0.85}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Create Customer
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NewCustomer;
