import React, { useState } from 'react';
import { View, Text, TouchableOpacity,StatusBar } from 'react-native';
import { Mail, Lock } from 'lucide-react-native';
import Input from '../components/CustomInput';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateAndSubmit = () => {
    let valid = true;

    if (!email.includes('@')) {
      setEmailError(t("errors.invalidEmail"));
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError(t("errors.shortPassword"));
      valid = false;
    } else {
      setPasswordError('');
    }

    // if (valid) {
      // alert(`${t("login.success")}\n${email}`);
      navigation.navigate('DashBoard')  
    // }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Text className="text-4xl font-bold mb-2 text-center text-gray-900">
        {t("login.title")}
      </Text>

      <Text className="text-base mb-6 text-center text-gray-600">
        {t("login.subtitle")}
      </Text>

      <Input
        placeholder={t("login.email")}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        error={emailError}
        autoCapitalize="none"
        icon={<Mail size={20} color="#6B7280" />}
      />

      <Input
        placeholder={t("login.password")}
        value={password}
        onChangeText={setPassword}
        isPassword
        showPassword={showPassword}
        togglePasswordVisibility={() => setShowPassword(!showPassword)}
        error={passwordError}
        icon={<Lock size={20} color="#6B7280" />}
      />

      <TouchableOpacity
        onPress={validateAndSubmit}
        className="bg-blue-600 rounded-lg py-3 mt-4"
        activeOpacity={0.8}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {t("login.button")}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
  onPress={() => navigation.navigate('Register')}
  activeOpacity={0.6} // slightly less opaque effect on press
>
  <Text className="text-blue-600 text-center mt-4 underline font-medium">
    {t ? t("login.noAccountRegister") : "Don't have an account? Register"}
  </Text>
</TouchableOpacity>

    </View>
  );
};

export default Login;
