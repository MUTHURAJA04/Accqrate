import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { RefreshCw, Car } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const Onboard = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView className="flex-1 px-6 pt-6">

        {/* E-INVOICING ON-BOARDING Card */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-blue-50 rounded-2xl p-6 mb-5 flex-row items-center shadow-sm"
          onPress={() => navigation.navigate('boardingTerminal')}
        >
          {/* Icon */}
          <View className="mr-5">
            <Car size={36} color="#000" strokeWidth={1.5} />
          </View>

          {/* Text */}
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {t('onboard.eInvoicing.title')}
            </Text>
            <Text className="text-sm text-gray-700 leading-5">
              {t('onboard.eInvoicing.description')}
            </Text>
          </View>
        </TouchableOpacity>

        {/* SKIP ON-BOARDING Card */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-blue-50 rounded-2xl p-6 mb-5 flex-row items-center shadow-sm"
        >
          {/* Icon */}
          <View className="mr-5">
            <RefreshCw size={36} color="#000" strokeWidth={1.5} />
          </View>

          {/* Text */}
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {t('onboard.skip.title')}
            </Text>
            <Text className="text-sm text-gray-700 leading-5">
              {t('onboard.skip.description')}
            </Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default Onboard;
