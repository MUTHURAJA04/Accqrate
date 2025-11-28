import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Input from '../../components/CustomInput';

const ChangePassword = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (password !== confirmPassword) {
      alert(t("profile.changePassword.passwordMismatch"));
      return;
    }
    console.log('Password saved:', password);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'white' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <View>

          <View className="mb-6">
            <Input
              placeholder={t("profile.changePassword.newPassword")}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>

          <View className="mb-6">
            <Input
              placeholder={t("profile.changePassword.confirmPassword")}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={handleSave}
              activeOpacity={0.8}
              className="bg-blue-600 py-4 rounded-lg items-center"
            >
              <Text className="text-white font-bold text-lg">{t("profile.changePassword.save")}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
