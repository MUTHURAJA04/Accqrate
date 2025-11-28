import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import Input from '../../components/CustomInput';

const MyProfile = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('');
  const [photo, setPhoto] = useState('');
  const [language, setLanguage] = useState('');

  const handleSave = () => {
    console.log('Saving profile:', {
      name,
      email,
      phoneNumber,
      role,
      photo,
      language,
    });
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>

        <View className="mb-6">
          <Input
            value={name}
            onChangeText={setName}
            placeholder={t("profile.myProfile.namePlaceholder")}
          />
        </View>

        <View className="mb-6">
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder={t("profile.myProfile.emailPlaceholder")}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={true}
          />
        </View>

        <View className="mb-6">
          <Input
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder={t("profile.myProfile.phonePlaceholder")}
            keyboardType="phone-pad"
          />
        </View>

        <View className="mb-6">
          <Input
            value={role}
            onChangeText={setRole}
            placeholder={t("profile.myProfile.rolePlaceholder")}
          />
        </View>

        <View className="mb-6">
          <Input
            value={photo}
            onChangeText={setPhoto}
            placeholder={t("profile.myProfile.photoPlaceholder")}
          />
        </View>

        <View className="mb-6">
          <Input
            value={language}
            onChangeText={setLanguage}
            placeholder={t("profile.myProfile.languagePlaceholder")}
          />
        </View>

        <View className="mb-8 mt-4">
          <TouchableOpacity
            onPress={handleSave}
            activeOpacity={0.8}
            className="bg-blue-600 rounded-lg py-4 items-center"
          >
            <Text className="text-white text-lg font-bold">{t("profile.myProfile.save")}</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

export default MyProfile;
