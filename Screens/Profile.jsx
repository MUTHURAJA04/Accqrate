import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Car, FileStack, ArrowLeft } from 'lucide-react-native';

const Profile = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const profileSections = [
    {
      title: t("profile.myProfile.title"),
      subtitle: t("profile.myProfile.subtitle"),
      icon: Car,
      screen: "MyProfile",
    },
    {
      title: t("profile.companyProfile.title"),
      subtitle: t("profile.companyProfile.subtitle"),
      icon: FileStack,
      screen: "CompanyProfile",
    },
    {
      title: t("profile.changePassword.title"),
      subtitle: t("profile.changePassword.subtitle"),
      icon: ArrowLeft,
      screen: "ChangePassword",
    },
  ];

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-6">

        {profileSections.map((section, index) => {
          const Icon = section.icon;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(section.screen)}
              activeOpacity={0.85}
              className="bg-blue-50 rounded-2xl p-6 mb-5 flex-row items-center shadow-sm"
            >
              {/* Icon */}
              <View className="mr-5">
                <Icon size={36} color="#000" strokeWidth={1.5} />
              </View>

              {/* Text */}
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900 mb-1">
                  {section.title}
                </Text>
                <Text className="text-sm text-gray-700 leading-5">
                  {section.subtitle}
                </Text>
              </View>

            </TouchableOpacity>
          );
        })}

      </ScrollView>
    </View>
  );
};

export default Profile;