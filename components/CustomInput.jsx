import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

const Input = ({
  placeholder,
  value,
  onChangeText,
  isPassword = false,
  showPassword,
  togglePasswordVisibility,
  keyboardType,
  error,
  maxLength,
  icon, // added icon prop here
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute',
    left: icon ? 40 : 12, // leave space if icon present
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [14, -8], // Changed from [18, -8] to [14, -8] to center initially
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ['#999999', error ? '#DC2626' : '#3B82F6'],
    }),
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    fontWeight: '500',
    zIndex: 10,
  };

  return (
    <View className="mb-4 w-full" style={style}>
      <View
        className={`flex-row items-center border-2 rounded-xl px-3 bg-white ${
          error ? 'border-red-600' : 'border-gray-300'
        } ${isFocused && !error ? 'border-blue-500' : ''}`}
      >
        {icon && (
          <View className="mr-3">
            {icon}
          </View>
        )}

        <Animated.Text
          pointerEvents="none"
          style={labelStyle}
        >
          {placeholder}
        </Animated.Text>

        <TextInput
          className="flex-1 text-black py-4 pr-2 rounded-xl"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="" // hide native placeholder for floating label effect
          {...props}
          style={{
            fontSize: 16,
            // Center text vertically
            paddingVertical: Platform.OS === 'android' ? 12 : 14,
            includeFontPadding: false,
            textAlignVertical: 'center',
            zIndex: 20,           // <-- Fix: ensure TextInput is above label
            backgroundColor: 'transparent', // <-- Fix: transparent background
          }}
        />

        {isPassword && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            {showPassword ? (
              <Eye size={20} color="#6B7280" />
            ) : (
              <EyeOff size={20} color="#6B7280" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <Text className="text-red-600 text-sm mt-1">{error}</Text>
      ) : null}
    </View>
  );
};

export default Input;
