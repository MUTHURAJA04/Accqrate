import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from './Header';
import Bottom from './Bottom';

const Layout = ({
  children,
  showHeader = true,
  showBottom = true,
  headerTitle,                    // optional: custom title for header
  headerComponent: CustomHeader,   // optional: allow custom header
  bottomComponent: CustomBottom    // optional: allow custom bottom
}) => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>

      {/* Header */}
      {showHeader && (
        <View className="w-full">
          {CustomHeader ? <CustomHeader /> : <Header title={headerTitle} />}
        </View>
      )}

      {/* Body */}
      <View className="flex-1">
        {children}
      </View>

      {/* Bottom Navigation */}
      {showBottom && (
        <View className="w-full">
          {CustomBottom ? <CustomBottom /> : <Bottom />}
        </View>
      )}

    </SafeAreaView>
  );
};

export default Layout;
