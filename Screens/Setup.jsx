import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { 
  Store, 
  Users, 
  Boxes, 
  BookOpenCheck, 
  Wrench, 
  Monitor, 
  CreditCard, 
  UserCheck 
} from 'lucide-react-native';

const Setup = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView className="flex-1 px-6 pt-6">

        {/* Stores */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-blue-50 rounded-2xl p-6 mb-5 flex-row items-center shadow-sm"
          onPress={() => navigation.navigate('Mystores')}
        >
          {/* Icon */}
          <View className="mr-5">
            <Store size={36} color="#000" strokeWidth={1.5} />
          </View>

          {/* Text */}
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {t('setup.stores.title')}
            </Text>
            <Text className="text-sm text-gray-700 leading-5">
              {t('setup.stores.description')}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Customers */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-blue-50 rounded-2xl p-6 mb-5 flex-row items-center shadow-sm"
          onPress={() => navigation.navigate('Customers')}
        >
          {/* Icon */}
          <View className="mr-5">
            <Users size={36} color="#000" strokeWidth={1.5} />
          </View>

          {/* Text */}
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {t('setup.customers.title')}
            </Text>
            <Text className="text-sm text-gray-700 leading-5">
              {t('setup.customers.description')}
            </Text>
          </View>
        </TouchableOpacity>

        {/* ProductsCategories */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-blue-50 rounded-2xl p-6 mb-5 flex-row items-center shadow-sm"
          onPress={() => navigation.navigate('ProductCategories')}
        >
          {/* Icon */}
          <View className="mr-5">
            <Boxes size={36} color="#000" strokeWidth={1.5} />
          </View>

          {/* Text */}
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {t('setup.products.title')}
            </Text>
            <Text className="text-sm text-gray-700 leading-5">
              {t('setup.products.description')}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Product */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-blue-50 rounded-2xl p-6 mb-5 flex-row items-center shadow-sm"
          onPress={() => navigation.navigate('Products')}
        >
          {/* Icon */}
          <View className="mr-5">
            <BookOpenCheck size={36} color="#000" strokeWidth={1.5} />
          </View>

          {/* Text */}
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {t('setup.accounts.title')}
            </Text>
            <Text className="text-sm text-gray-700 leading-5">
              {t('setup.accounts.description')}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Product */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-blue-50 rounded-2xl p-6 mb-5 flex-row items-center shadow-sm"
        >
          {/* Icon */}
          <View className="mr-5">
            <Wrench size={36} color="#000" strokeWidth={1.5} />
          </View>

          {/* Text */}
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {t('setup.services.title')}
            </Text>
            <Text className="text-sm text-gray-700 leading-5">
              {t('setup.services.description')}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Terminals */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-blue-50 rounded-2xl p-6 mb-5 flex-row items-center shadow-sm"
        >
          {/* Icon */}
          <View className="mr-5">
            <Monitor size={36} color="#000" strokeWidth={1.5} />
          </View>

          {/* Text */}
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {t('setup.terminals.title')}
            </Text>
            <Text className="text-sm text-gray-700 leading-5">
              {t('setup.terminals.description')}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Payment Methods */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-blue-50 rounded-2xl p-6 mb-5 flex-row items-center shadow-sm"
        >
          {/* Icon */}
          <View className="mr-5">
            <CreditCard size={36} color="#000" strokeWidth={1.5} />
          </View>

          {/* Text */}
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {t('setup.paymentMethods.title')}
            </Text>
            <Text className="text-sm text-gray-700 leading-5">
              {t('setup.paymentMethods.description')}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Sales Person */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-blue-50 rounded-2xl p-6 mb-10 flex-row items-center shadow-sm"
        >
          {/* Icon */}
          <View className="mr-5">
            <UserCheck size={36} color="#000" strokeWidth={1.5} />
          </View>

          {/* Text */}
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {t('setup.salesPerson.title')}
            </Text>
            <Text className="text-sm text-gray-700 leading-5">
              {t('setup.salesPerson.description')}
            </Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default Setup;
