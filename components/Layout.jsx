import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // <--- updated import
import Header from './Header';
import Bottom from './Bottom';

const Layout = ({ children, showHeader = true, showBottom = true }) => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
      {/* Header */}
      {showHeader && (
        <View className="w-full">
          <Header />
        </View>
      )}

      {/* Main content */}
      <View className="flex-1">
        {children}
      </View>

      {/* Bottom Navigation */}
      {showBottom && (
        <View className="w-full">
          <Bottom />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Layout;
