import React from "react";
import { View, Text } from "react-native";

const Header = ({ title = "Screen" }) => {
  return (
    <View className="w-full bg-white px-4 py-3 flex-row items-center justify-between">

      {/* Left: Title with blue underline */}
      <View>
        <Text
          className="text-lg md:text-xl font-bold text-slate-900"
          numberOfLines={1}
        >
          {title}
        </Text>

        {/* Blue underline */}
        <View className="h-1 w-10 bg-blue-600 rounded-full mt-1" />
      </View>

      {/* Right placeholder */}
      <View className="w-8" />
    </View>
  );
};

export default Header;
