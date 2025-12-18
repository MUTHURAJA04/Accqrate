import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Input from '../../components/CustomInput';
import { BILLS_HISTORY } from '../../DATA/products';
import {
  Printer,
  Edit,
  Trash2,
  CreditCard,
  FileText,
} from 'lucide-react-native';

const Billshistory = () => {
  const [search, setSearch] = useState('');

  const filteredBills = BILLS_HISTORY.filter(bill =>
    bill.invoiceNo.toLowerCase().includes(search.toLowerCase()),
  );

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const renderItem = ({ item }) => {
    const isApproved = item.status === 'Approved';
    const balanceDue = item.grossAmount - item.paidAmount;

    return (
      <View className="bg-white rounded-xl border border-gray-200 mb-4 mx-4">
        {/* Header */}
        <View className="flex-row justify-between items-center px-4 py-3 bg-indigo-50 rounded-t-xl">
          <View>
            <Text className="font-bold text-base text-gray-900">
              {item.invoiceNo}
            </Text>
            <Text className="text-xs text-gray-500">
              {formatDate(item.date)}
            </Text>
          </View>

          <View
            className={`px-3 py-1 rounded-full ${
              isApproved ? 'bg-green-100' : 'bg-gray-200'
            }`}
          >
            <Text
              className={`text-xs font-semibold ${
                isApproved ? 'text-green-700' : 'text-gray-600'
              }`}
            >
              {item.status}
            </Text>
          </View>
        </View>

        {/* Amounts */}
        <View className="px-4 py-3 space-y-1">
          <Text className="text-sm text-gray-700">
            Net Amount: {item.netAmount.toFixed(3)} BHD
          </Text>
          <Text className="text-sm text-gray-700">
            Tax Amount: {item.taxAmount.toFixed(3)} BHD
          </Text>
          <Text className="text-sm font-semibold text-gray-900">
            Gross Amount: {item.grossAmount.toFixed(3)} BHD
          </Text>
          <Text
            className={`text-sm font-semibold ${
              item.paidAmount > 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            Paid Amount: {item.paidAmount.toFixed(3)} BHD
          </Text>

          {balanceDue > 0 && (
            <Text className="text-sm font-bold text-red-600">
              Due: {balanceDue.toFixed(3)} BHD
            </Text>
          )}
        </View>

        {/* Actions */}
        <View className="flex-row justify-between items-center px-4 py-3 border-t border-gray-200">
          {isApproved ? (
            <TouchableOpacity
              onPress={() => console.log('Print:', item.invoiceNo)}
              className="flex-row items-center px-3 py-2 bg-blue-400 rounded-lg"
            >
              <Printer size={18} color="white" />
              <Text className="text-white font-semibold ml-2">Print</Text>
            </TouchableOpacity>
          ) : (
            <>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <TouchableOpacity
                  onPress={() => console.log('Edit:', item.invoiceNo)}
                  className="flex-row items-center px-3 py-2 bg-gray-200 rounded-lg"
                >
                  <Edit size={18} color="#374151" />
                  <Text className="text-gray-800 font-medium ml-2">Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => console.log('Delete:', item.invoiceNo)}
                  className="flex-row items-center px-3 py-2 bg-red-200 rounded-lg"
                >
                  <Trash2 size={18} color="#b91c1c" />
                  <Text className="text-red-800 font-medium ml-2">Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => console.log('Pay:', item.invoiceNo)}
                  className="flex-row items-center px-3 py-2 bg-green-200 rounded-lg"
                >
                  <CreditCard size={18} color="#15803d" />
                  <Text className="text-green-800 font-medium ml-2">Pay</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => console.log('Print:', item.invoiceNo)}
                  className="flex-row items-center px-3 py-2 bg-blue-400 rounded-lg"
                >
                  <Printer size={18} color="white" />
                  <Text className="text-white font-semibold ml-2">Print</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Stats Bar */}
      {filteredBills.length > 0 && (
        <View className="mx-4 mt-4 p-3 bg-white rounded-xl border border-gray-200">
          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <Text className="font-bold text-gray-900">
                {filteredBills.length}
              </Text>
              <Text className="text-xs text-gray-500">Total</Text>
            </View>

            <View className="items-center flex-1">
              <Text className="font-bold text-green-600">
                {filteredBills.filter(b => b.status === 'Approved').length}
              </Text>
              <Text className="text-xs text-gray-500">Paid</Text>
            </View>

            <View className="items-center flex-1">
              <Text className="font-bold text-orange-600">
                {filteredBills.filter(b => b.status !== 'Approved').length}
              </Text>
              <Text className="text-xs text-gray-500">Due</Text>
            </View>
          </View>
        </View>
      )}

      {/* Search Bar */}
      <View className="px-4 mt-4 mb-2">
        <Input
          placeholder="Search invoice number..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Invoice List */}
      <FlatList
        data={filteredBills}
        keyExtractor={item => item.invoiceNo}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
        ListEmptyComponent={
          <View className="items-center justify-center py-20">
            <FileText size={48} color="#d1d5db" />
            <Text className="text-base font-medium text-gray-500 mt-3">
              No invoices found
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Billshistory;
