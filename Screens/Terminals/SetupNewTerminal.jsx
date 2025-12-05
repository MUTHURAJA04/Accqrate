import { View, Text, TouchableOpacity, Switch, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/CustomInput';

const SetupNewTerminal = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    terminalCode: '',
    terminalName: '',
    storeName: '',
    instantPrinting: false,
    invoiceTransmission: '',
    linkDevice: '',
  });

  const toggleSwitch = () =>
    setForm({ ...form, instantPrinting: !form.instantPrinting });

  const handleCreateTerminal = () => {
    if (!form.terminalCode || !form.terminalName) {
      Alert.alert('Validation Error', 'Please fill in Terminal Code and Terminal Name');
      return;
    }

    const terminalData = {
      ...form,
      id: Date.now().toString(),
      isEdit: false,
    };

    navigation.navigate('Terminals', {
      newTerminal: terminalData,
    });
    
    setTimeout(() => {
      Alert.alert('Success', 'Terminal created successfully');
    }, 300);
  };

  return (
    <View className="flex-1 bg-white px-6 pt-6">

      {/* Terminal Code */}
      <Input
        placeholder="Terminal Code"
        value={form.terminalCode}
        onChangeText={(text) => setForm({ ...form, terminalCode: text })}
      />

      {/* Terminal Name */}
      <Input
        placeholder="Terminal Name"
        value={form.terminalName}
        onChangeText={(text) => setForm({ ...form, terminalName: text })}
      />

      {/* Store Name */}
      <Input
        placeholder="Store Name"
        value={form.storeName}
        onChangeText={(text) => setForm({ ...form, storeName: text })}
      />

      {/* Invoice Transmission */}
      <Input
        placeholder="Invoice Transmission"
        value={form.invoiceTransmission}
        onChangeText={(text) =>
          setForm({ ...form, invoiceTransmission: text })
        }
      />

      {/* Link Device for ZATCA */}
      <Input
        placeholder="Link Device for ZATCA"
        value={form.linkDevice}
        onChangeText={(text) => setForm({ ...form, linkDevice: text })}
      />

      {/* Enable Instant Printing (Input Styled) */}
      <View className="mt-4">
        {/* Floating Label */}
        <View className="absolute left-3 -top-2 bg-white px-1 z-10">
          <Text className="text-xs text-gray-500 font-medium">
            Enable Instant Printing
          </Text>
        </View>

        {/* Input Box */}
        <View className="border border-gray-300 rounded-xl flex-row items-center justify-between px-4 py-4 bg-white">
          <Text className="text-gray-700 text-base">Enable</Text>

          <Switch
            value={form.instantPrinting}
            onValueChange={toggleSwitch}
            thumbColor={form.instantPrinting ? '#2563EB' : '#f4f3f4'}
            trackColor={{ true: '#93C5FD', false: '#D1D5DB' }}
          />
        </View>
      </View>

      {/* Create Button */}
      <TouchableOpacity
        onPress={handleCreateTerminal}
        className="bg-blue-600 py-4 rounded-xl mt-8"
        activeOpacity={0.8}
      >
        <Text className="text-center text-white font-semibold text-lg">
          Create Terminal
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default SetupNewTerminal;
