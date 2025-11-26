import React, { useState, useRef } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView, StatusBar, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const Otp = ({ route }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const email = route?.params?.email || 'XXXXXX@iteron.ch';
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < 5) {
        inputs.current[index + 1].focus();
      } else if (!text && index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center items-center px-4 py-8">
          <Text className="text-2xl font-bold text-gray-900 text-center mb-4">
            {t("otp.title")}
          </Text>

          <Text className="text-base text-gray-600 text-center leading-6 mb-3 px-2">
            {t("otp.instruction")}
          </Text>

          <Text className="text-lg font-semibold text-blue-500 text-center mb-4 px-2">
            {email}
          </Text>

          <Text className="text-sm text-gray-500 text-center leading-5 mb-6 px-2">
            {t("otp.additionalInstruction")}
          </Text>

          <View className="w-full flex-row justify-between items-center px-2 mb-6">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={el => inputs.current[index] = el}
                value={digit}
                onChangeText={text => handleChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
                className="w-12 h-12 border-2 border-gray-400 rounded-lg text-center text-lg font-bold text-gray-900 bg-white"
                returnKeyType="done"
                autoFocus={index === 0}
                selectionColor="#3B82F6"
                style={{
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  includeFontPadding: false,
                  padding: 0,
                  margin: 0,
                  lineHeight: Platform.OS === 'ios' ? 0 : undefined,
                }}
              />
            ))}
          </View>

          <View className="flex-row justify-center items-center mb-4">
            <Text className="text-gray-500 text-sm mr-1">
              {t("otp.resendText")}
            </Text>
            <Text className="text-blue-500 text-sm font-semibold">
              {t("otp.resendButton")}
            </Text>
          </View>

          <View className="w-full px-2">
            <TouchableOpacity 
              className="bg-blue-500 rounded-lg py-3"
              onPress={() => navigation.navigate('Companyinfo')}
            >
              <Text className="text-white text-center font-semibold text-base">
                {t("otp.verifyButton")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Otp;