import { View, Text, TouchableOpacity, ScrollView, StatusBar, KeyboardAvoidingView, Platform, Modal, FlatList } from 'react-native';
import React, { useState } from 'react';
import Input from '../components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Building, Phone, FileDigit, MapPin, DollarSign, Lock, CheckCircle2, ChevronDown } from 'lucide-react-native';

const Companyinfo = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    companyName: '',
    phoneNumber: '',
    vatNumber: '',
    country: '',
    currency: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'IT', name: 'Italy' },
    { code: 'ES', name: 'Spain' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'AE', name: 'United Arab Emirates' },
    { code: 'IN', name: 'India' },
    { code: 'CN', name: 'China' },
    { code: 'JP', name: 'Japan' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
  ];

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleCountrySelect = (country) => {
    setFormData(prev => ({
      ...prev,
      country: country.name
    }));
    setShowCountryDropdown(false);
  };

  const handleCurrencySelect = (currency) => {
    setFormData(prev => ({
      ...prev,
      currency: currency.code
    }));
    setShowCurrencyDropdown(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = t("errors.requiredCompanyName");
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = t("errors.requiredPhone");
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = t("errors.invalidPhone");
    }

    if (!formData.vatNumber.trim()) {
      newErrors.vatNumber = t("errors.requiredVat");
    }

    if (!formData.country.trim()) {
      newErrors.country = t("errors.requiredCountry");
    }

    if (!formData.currency.trim()) {
      newErrors.currency = t("errors.requiredCurrency");
    }

    if (!formData.password) {
      newErrors.password = t("errors.requiredPassword");
    } else if (formData.password.length < 6) {
      newErrors.password = t("errors.shortPassword");
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = t("errors.requiredPassword");
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t("errors.passwordMismatch");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    // if (validateForm()) {
      console.log('Form submitted:', formData);
      navigation.navigate('RegistrationSuccess');
    // }
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCountrySelect(item)}
      className="px-4 py-4 border-b border-gray-200 bg-white active:bg-gray-50"
    >
      <Text className="text-base text-gray-900">{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCurrencyItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCurrencySelect(item)}
      className="px-4 py-4 border-b border-gray-200 bg-white active:bg-gray-50"
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-base text-gray-900 font-medium">{item.code}</Text>
        <Text className="text-base text-gray-600">{item.name} ({item.symbol})</Text>
      </View>
    </TouchableOpacity>
  );

  const DropdownInput = ({ 
    placeholder, 
    value, 
    onPress, 
    error, 
    icon, 
    isOpen 
  }) => (
    <View className="mb-4">
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className={`
          flex-row items-center border rounded-xl px-4 bg-white
          ${error ? 'border-red-600' : 'border-gray-300'}
          ${value ? 'border-blue-500' : ''}
        `}
        style={{
          height: 56,
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        {icon && (
          <View className="mr-3">
            {icon}
          </View>
        )}

        <View className="flex-1 justify-center">
          {value ? (
            <View>
              <Text className="text-xs text-blue-500 font-medium mb-1">
                {placeholder}
              </Text>
              <Text className="text-base text-gray-900 font-medium">
                {value}
              </Text>
            </View>
          ) : (
            <Text className="text-base text-gray-500">
              {placeholder}
            </Text>
          )}
        </View>

        <View className="ml-2">
          <ChevronDown 
            size={20} 
            color={error ? '#DC2626' : value ? '#3B82F6' : '#6B7280'} 
          />
        </View>
      </TouchableOpacity>
      
      {error && (
        <Text className="text-red-600 text-sm mt-1 ml-1">{error}</Text>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        className="flex-1"
      >
        <View className="flex-1 px-6 py-8">
          <View className="items-center mb-8">
            <Text className="text-3xl font-bold text-gray-900 text-center mb-2">
              {t("companyInfo.title")}
            </Text>
            <Text className="text-base text-gray-600 text-center">
              {t("companyInfo.subtitle")}
            </Text>
          </View>

          <View>
            <Input
              placeholder={t("companyInfo.companyName")}
              value={formData.companyName}
              onChangeText={(value) => handleChange('companyName', value)}
              error={errors.companyName}
              icon={<Building size={20} color="#6B7280" />}
              autoCapitalize="words"
            />

            <Input
              placeholder={t("companyInfo.phoneNumber")}
              value={formData.phoneNumber}
              onChangeText={(value) => handleChange('phoneNumber', value)}
              error={errors.phoneNumber}
              keyboardType="phone-pad"
              icon={<Phone size={20} color="#6B7280" />}
            />

            <Input
              placeholder={t("companyInfo.vatNumber")}
              value={formData.vatNumber}
              onChangeText={(value) => handleChange('vatNumber', value)}
              error={errors.vatNumber}
              icon={<FileDigit size={20} color="#6B7280" />}
              autoCapitalize="characters"
            />

            <DropdownInput
              placeholder={t("companyInfo.country")}
              value={formData.country}
              onPress={() => setShowCountryDropdown(true)}
              error={errors.country}
              icon={<MapPin size={20} color={errors.country ? '#DC2626' : formData.country ? '#3B82F6' : '#6B7280'} />}
              isOpen={showCountryDropdown}
            />

            <DropdownInput
              placeholder={t("companyInfo.currency")}
              value={formData.currency}
              onPress={() => setShowCurrencyDropdown(true)}
              error={errors.currency}
              icon={<DollarSign size={20} color={errors.currency ? '#DC2626' : formData.currency ? '#3B82F6' : '#6B7280'} />}
              isOpen={showCurrencyDropdown}
            />

            <Input
              placeholder={t("companyInfo.password")}
              value={formData.password}
              onChangeText={(value) => handleChange('password', value)}
              error={errors.password}
              isPassword
              showPassword={showPassword}
              togglePasswordVisibility={() => setShowPassword(!showPassword)}
              icon={<Lock size={20} color="#6B7280" />}
            />

            <Input
              placeholder={t("companyInfo.confirmPassword")}
              value={formData.confirmPassword}
              onChangeText={(value) => handleChange('confirmPassword', value)}
              error={errors.confirmPassword}
              isPassword
              showPassword={showConfirmPassword}
              togglePasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
              icon={<CheckCircle2 size={20} color="#6B7280" />}
            />
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-600 rounded-xl py-4 mt-6 shadow-sm"
            activeOpacity={0.8}
          >
            <Text className="text-white text-center font-semibold text-lg">
              {t("companyInfo.createAccount")}
            </Text>
          </TouchableOpacity>

          <Text className="text-xs text-gray-500 text-center mt-6">
            {t("companyInfo.terms")}
          </Text>
        </View>
      </ScrollView>

      <Modal
        visible={showCountryDropdown}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCountryDropdown(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl max-h-3/4">
            <View className="py-4 border-b border-gray-200">
              <Text className="text-lg font-semibold text-center text-gray-900">
                {t("companyInfo.selectCountry")}
              </Text>
            </View>
            <FlatList
              data={countries}
              renderItem={renderCountryItem}
              keyExtractor={(item) => item.code}
              showsVerticalScrollIndicator={false}
              className="max-h-96"
            />
            <TouchableOpacity
              onPress={() => setShowCountryDropdown(false)}
              className="py-4 bg-gray-100 rounded-b-3xl active:bg-gray-200"
            >
              <Text className="text-blue-600 text-center font-semibold">
                {t("companyInfo.cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showCurrencyDropdown}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCurrencyDropdown(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl max-h-3/4">
            <View className="py-4 border-b border-gray-200">
              <Text className="text-lg font-semibold text-center text-gray-900">
                {t("companyInfo.selectCurrency")}
              </Text>
            </View>
            <FlatList
              data={currencies}
              renderItem={renderCurrencyItem}
              keyExtractor={(item) => item.code}
              showsVerticalScrollIndicator={false}
              className="max-h-96"
            />
            <TouchableOpacity
              onPress={() => setShowCurrencyDropdown(false)}
              className="py-4 bg-gray-100 rounded-b-3xl active:bg-gray-200"
            >
              <Text className="text-blue-600 text-center font-semibold">
                {t("companyInfo.cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default Companyinfo;