import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { Mail, User } from 'lucide-react-native';
import Input from '../components/CustomInput';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateAndGetOtp = () => {
    let valid = true;

    if (!name.trim()) {
      setNameError(t("errors.requiredName"));
      valid = false;
    } else {
      setNameError('');
    }

    if (!email.includes('@')) {
      setEmailError(t("errors.invalidEmail"));
      valid = false;
    } else {
      setEmailError('');
    }

    if (valid) {
      // Here you would trigger your OTP send logic
      Alert.alert(
        t("register.success"), 
        t("register.otpSent", { email: email })
      );
    }
    navigation.navigate('Otp');
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <Text className="text-4xl font-bold mb-2 text-center text-gray-900">
        {t("register.title")}
      </Text>

      <Text className="text-base mb-6 text-center text-gray-600">
        {t("register.subtitle")}
      </Text>

      <Input
        placeholder={t("register.name")}
        value={name}
        onChangeText={setName}
        error={nameError}
        icon={<User size={20} color="#6B7280" />}
        autoCapitalize="words"
      />

      <Input
        placeholder={t("register.email")}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        error={emailError}
        icon={<Mail size={20} color="#6B7280" />}
        autoCapitalize="none"
      />

      <TouchableOpacity
        onPress={validateAndGetOtp}
        className="bg-blue-600 rounded-lg py-3 mt-6"
        activeOpacity={0.8}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {t("register.button")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        activeOpacity={0.6}
      >
        <Text className="text-blue-600 text-center mt-4 underline font-medium">
          {t("register.haveAccountLogin")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;