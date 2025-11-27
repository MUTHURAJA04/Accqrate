import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Animated } from 'react-native';
import Input from '../components/CustomInput';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [isCardNumberFocused, setIsCardNumberFocused] = useState(false);

  // Blinking cursor animation
  const cursorOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blinkAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    if (isCardNumberFocused) {
      blinkAnimation.start();
    } else {
      blinkAnimation.stop();
      cursorOpacity.setValue(1);
    }

    return () => blinkAnimation.stop();
  }, [isCardNumberFocused]);

  // Format card number with spaces
  const formatCardNumber = (text) => {
    const cleaned = text.replace(/\s/g, '');
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted;
  };

  // Format expiration date as MM/YY
  const formatExpirationDate = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  // Get displayed card number with masking
  const getDisplayCardNumber = () => {
    const digits = cardNumber.replace(/\s/g, '');
    
    if (digits.length === 0) {
      return '1234 56XX XXXX XXXX';
    }
    
    // Build display: show entered digits, mask the rest
    let result = '';
    for (let i = 0; i < 16; i++) {
      if (i < digits.length) {
        result += digits[i];
      } else {
        result += 'X';
      }
      // Add space after every 4 characters
      if ((i + 1) % 4 === 0 && i < 15) {
        result += ' ';
      }
    }
    
    return result;
  };

  const handleCardNumberChange = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 16) {
      setCardNumber(cleaned);
    }
  };

  const handleExpirationDateChange = (text) => {
    const formatted = formatExpirationDate(text);
    if (formatted.length <= 5) {
      setExpirationDate(formatted);
    }
  };

  const handleCvvChange = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length <= 4) {
      setCvv(cleaned);
    }
  };

  return (
    <View className="flex-1 bg-white px-6">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Credit Card Visual - Exactly like your original design */}
      <View className="mt-8 mb-8">
        <View className="bg-gray-600 rounded-2xl p-6 h-48 justify-between">
          {/* CARD label in top right */}
          <View className="items-end">
            <Text className="text-white text-lg font-bold">CARD</Text>
          </View>

          {/* Card Number with blinking cursor */}
          <View className="flex-row items-center">
            <Text className="text-white text-2xl font-medium tracking-wider">
              {getDisplayCardNumber()}
            </Text>
            {isCardNumberFocused && (
              <Animated.View
                style={{
                  opacity: cursorOpacity,
                  width: 2,
                  height: 28,
                  backgroundColor: 'white',
                  marginLeft: 4,
                }}
              />
            )}
          </View>
        </View>
      </View>

      {/* Input Form using CustomInput */}
      <View className="flex-1">
        {/* Card Number */}
        <Input
          placeholder="Card number"
          value={formatCardNumber(cardNumber)}
          onChangeText={handleCardNumberChange}
          keyboardType="numeric"
          maxLength={19}
          onFocus={() => setIsCardNumberFocused(true)}
          onBlur={() => setIsCardNumberFocused(false)}
        />

        <View className="flex-row space-x-4">
          {/* Expiration Date */}
          <View className="flex-1">
            <Input
              placeholder="MM/YY"
              value={expirationDate}
              onChangeText={handleExpirationDateChange}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>

          {/* CVV */}
          <View className="flex-1">
            <Input
              placeholder="CVV"
              value={cvv}
              onChangeText={handleCvvChange}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
            />
          </View>
        </View>

        {/* Card Holder's Name */}
        <Input
          placeholder="Card holder's name"
          value={cardHolderName}
          onChangeText={setCardHolderName}
          autoCapitalize="words"
        />
      </View>

      {/* Pay Secured Button */}
      <View className="pb-8">
        <TouchableOpacity
          activeOpacity={0.8}
          className="bg-blue-600 rounded-lg py-4 items-center"
        >
          <Text className="text-white text-lg font-bold">Pay Secured</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Payment;