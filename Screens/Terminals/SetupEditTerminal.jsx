import { View, Text, TouchableOpacity, Switch, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Input from '../../components/CustomInput';

const SetupEditTerminal = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const editTerminal = route?.params?.editTerminal;

  const [form, setForm] = useState({
    terminalCode: '',
    terminalName: '',
    storeName: '',
    instantPrinting: false,
    invoiceTransmission: '',
    linkDevice: '',
  });

  // Pre-fill form with terminal data
  useEffect(() => {
    if (editTerminal) {
      setForm({
        terminalCode: editTerminal.TerminalsCode || editTerminal.terminalCode || '',
        terminalName: editTerminal.TerminalsName || editTerminal.terminalName || '',
        storeName: editTerminal.storeName || '',
        instantPrinting: editTerminal.instantPrinting || false,
        invoiceTransmission: editTerminal.invoiceTransmission || '',
        linkDevice: editTerminal.linkDevice || '',
      });
    }
  }, [editTerminal]);

  const toggleSwitch = () =>
    setForm({ ...form, instantPrinting: !form.instantPrinting });

  const handleUpdateTerminal = () => {
    if (!form.terminalCode || !form.terminalName) {
      Alert.alert(
        'Validation Error',
        'Please fill in Terminal Code and Terminal Name fields',
        [{ text: 'OK' }]
      );
      return;
    }

    const terminalId = editTerminal?.id || Date.now().toString();
    
    if (!editTerminal) {
      Alert.alert(
        'Error',
        'Terminal data is missing. Cannot update terminal.',
        [{ text: 'OK' }]
      );
      return;
    }
    
    const updatedTerminal = {
      ...form,
      id: terminalId,
      isEdit: true,
    };
    
    navigation.navigate('Terminals', {
      newTerminal: updatedTerminal
    });
    
    setTimeout(() => {
      Alert.alert(
        'Success',
        'Terminal updated successfully',
        [{ text: 'OK' }]
      );
    }, 500);
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

      {/* Update Button */}
      <TouchableOpacity
        onPress={handleUpdateTerminal}
        className="bg-blue-600 py-4 rounded-xl mt-8"
        activeOpacity={0.8}
      >
        <Text className="text-center text-white font-semibold text-lg">
          Update Terminal
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default SetupEditTerminal;