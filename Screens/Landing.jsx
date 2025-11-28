import React, { useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function Landing() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Langauage'); // Navigate after 3 seconds
    }, 1000);

    // Cleanup timer if component unmounts early
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
     <StatusBar  barStyle="dark-content"  backgroundColor="white" />
      <Text className="text-4xl font-bold text-gray-800 mb-4">{t("landing.appName")}</Text>
      <Text className="text-lg text-gray-600 text-center">{t("landing.tagline")}</Text>
    </View>
  );
}
