import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import Input from '../../components/CustomInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CreditNote = () => {
  const [invoiceNo, setInvoiceNo] = useState('');
  const navigation = useNavigation();

  const onGetDetails = async () => {
    if (!invoiceNo.trim()) {
      Alert.alert('Error', 'Please enter an invoice number.');
      return;
    }

    try {
      const storageKey = `@invoice_${invoiceNo.trim()}`;
      const invoiceJson = await AsyncStorage.getItem(storageKey);

      if (!invoiceJson) {
        Alert.alert('Not Found', `No invoice found with number: ${invoiceNo}`);
        return;
      }

      const invoiceData = JSON.parse(invoiceJson);
      const productCount = invoiceData.products.length;
      const totalPayable = invoiceData.totalPayable?.toFixed(2) ?? 'N/A';
      const date = new Date(invoiceData.timestamp).toLocaleString();

      Alert.alert(
        `Invoice: ${invoiceNo}`,
        `Date: ${date}\nProducts: ${productCount}\nTotal Payable: ₹${totalPayable}`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to Checkout screen with invoice data
           navigation.navigate('Checkout', { scannedProducts: invoiceData.products, totalAmount: invoiceData.totalPayable });
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error loading invoice:', error);
      Alert.alert('Error', 'Failed to load invoice data.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      <View style={{ flex: 1, padding: 24 }}>
        <Input
          placeholder="Invoice / Bill no."
          value={invoiceNo}
          onChangeText={setInvoiceNo}
        />
      </View>

      <View
        style={{
          padding: 24,
          borderTopWidth: 1,
          borderColor: '#ddd',
          backgroundColor: 'white',
        }}
      >
        <TouchableOpacity
          onPress={onGetDetails}
          style={{
            backgroundColor: '#2563EB',
            paddingVertical: 16,
            borderRadius: 12,
          }}
          activeOpacity={0.8}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            Get Details
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreditNote;
