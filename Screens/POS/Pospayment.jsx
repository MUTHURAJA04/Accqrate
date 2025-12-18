import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { clearProducts } from '../../utils/invoiceStorage';

const Pospayment = ({ route, navigation }) => {
  const totalAmount = route.params?.totalAmount || 0;

  const [creditCard, setCreditCard] = useState('');
  const [benefitPay, setBenefitPay] = useState('');
  const [cash, setCash] = useState(''); // Start empty, user inputs
  const [receivedAmount, setReceivedAmount] = useState('');

  // Parse payment inputs as floats or 0
  const creditCardVal = parseFloat(creditCard) || 0;
  const benefitPayVal = parseFloat(benefitPay) || 0;
  const cashVal = parseFloat(cash) || 0;
  const received = parseFloat(receivedAmount) || 0;

  const totalPaid = creditCardVal + benefitPayVal + cashVal;

  // Return amount is based on physical cash received minus total amount due
  const returnAmount = received > totalAmount ? received - totalAmount : 0;

  const formatAmount = (num) => {
    if (isNaN(num)) return '0.000';
    return parseFloat(num).toFixed(3);
  };

  /**
   * Handle payment completion
   * Validates payment, then clears invoice products from AsyncStorage
   * and navigates back to Invoice (which will be empty)
   */
  const handleTender = async () => {
    // Validate payment amounts
    if (totalPaid < totalAmount) {
      Alert.alert('Payment Error', 'Paid amount is less than total amount.');
      return;
    }
    if (received < cashVal) {
      Alert.alert('Payment Error', 'Received amount is less than cash payment amount.');
      return;
    }

    try {
      // Clear invoice products from AsyncStorage after successful payment
      await clearProducts();
      
      // Show success message
      Alert.alert(
        'Payment Successful!',
        `Paid: ${formatAmount(totalPaid)} BHD\nReturn: ${formatAmount(returnAmount)} BHD`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back to Invoice (products are now cleared)
              navigation.navigate('Invoice');
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error clearing products after payment:', error);
      // Still show success and navigate even if storage clear fails
      Alert.alert(
        'Payment Successful!',
        `Paid: ${formatAmount(totalPaid)} BHD\nReturn: ${formatAmount(returnAmount)} BHD`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Invoice');
            },
          },
        ]
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-100"
    >
      {/* Total Amount bar */}
      <View className="bg-blue-600 py-3 px-4">
        <Text className="text-white text-right text-lg font-semibold">
          {formatAmount(totalAmount)} BHD
        </Text>
      </View>

      {/* Scrollable payment methods */}
      <ScrollView
        className="p-4"
        contentContainerStyle={{ paddingBottom: 180 }}
        showsVerticalScrollIndicator={false}
      >
        {['Credit Card', 'Benefit Pay', 'Cash'].map((method) => {
          const value =
            method === 'Credit Card'
              ? creditCard
              : method === 'Benefit Pay'
              ? benefitPay
              : cash;
          const setter =
            method === 'Credit Card'
              ? setCreditCard
              : method === 'Benefit Pay'
              ? setBenefitPay
              : setCash;

          return (
            <View
              key={method}
              className="flex-row items-center mb-4"
              style={{ gap: 10 }}
            >
              <Text className="flex-1 text-base">{method}</Text>
              <TextInput
                keyboardType="numeric"
                placeholder="0.000"
                className="border border-gray-400 rounded px-3 py-1 w-32 text-right bg-white"
                value={value}
                onChangeText={(text) => {
                  // Allow max 3 decimals, digits only
                  if (/^\d*\.?\d{0,3}$/.test(text)) setter(text);
                }}
              />
              <Text className="font-semibold">BHD</Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Fixed bottom container */}
      <View className="absolute bottom-0 left-0 right-0 bg-blue-200 border-t border-gray-300">
        {/* Received Amount Input + Return Amount */}
        <View className="flex-row items-center p-3">
          <TextInput
            keyboardType="numeric"
            placeholder="Received Amount"
            className="flex-1 border border-gray-400 rounded px-3 py-1 bg-white text-right"
            value={receivedAmount}
            onChangeText={(text) => {
              if (/^\d*\.?\d{0,3}$/.test(text)) setReceivedAmount(text);
            }}
          />
          <Text className="ml-2 font-semibold">BHD</Text>
        </View>

        <Text className="text-red-600 font-bold text-center mb-2">
          RETURN AMOUNT {formatAmount(returnAmount)} BHD
        </Text>

        {/* Bottom Bar */}
        <View className="bg-blue-600 flex-row items-center justify-between p-2">
          <TouchableOpacity
            className="px-6 py-3 rounded flex-row items-center bg-white/50"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-black font-semibold text-lg"> Back</Text>
          </TouchableOpacity>

          <View className="flex-1">
            <Text className="text-white font-extrabold text-center text-xl">
              {formatAmount(totalAmount)}
            </Text>
          </View>

          <TouchableOpacity
            className="bg-green-600/50 px-6 py-3 rounded flex-row items-center"
            onPress={handleTender}
          >
            <Text className="text-white font-semibold text-lg">Tender</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Pospayment;
