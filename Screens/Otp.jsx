import React, { useState, useRef } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

const Otp = ({ route }) => {
  // You can get the email from params or props; for demo, hardcoded
  const email = route?.params?.email || 'XXXXXX@iteron.ch';

  // State to store 6 digits separately
  const [otp, setOtp] = useState(new Array(6).fill(''));

  // Refs to control focus on inputs
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d*$/.test(text)) { // Only digits allowed
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Focus next input if current is filled
      if (text && index < 5) {
        inputs.current[index + 1].focus();
      }
      // Optionally, if deleting and empty, focus previous
      else if (!text && index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white justify-center px-6"
    >
      <Text className="text-center text-lg text-gray-700 mb-6">
        We have sent the OTP{'\n'}
        to the mail id{'\n'}
        <Text className="font-semibold">{email}</Text>{'\n'}
        Please check and provide the OTP below{'\n'}
        to complete your company setup
      </Text>

      <View className="flex-row justify-center space-x-3">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={el => inputs.current[index] = el}
            value={digit}
            onChangeText={text => handleChange(text, index)}
            keyboardType="number-pad"
            maxLength={1}
            className="border border-gray-300 rounded-lg text-center text-2xl w-12 h-12"
            style={{ elevation: 2 }}
            returnKeyType="done"
            autoFocus={index === 0}
          />
        ))}
      </View>
    </KeyboardAvoidingView>
  );
};

export default Otp;
