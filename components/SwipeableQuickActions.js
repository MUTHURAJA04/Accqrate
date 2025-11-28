import React, { useState } from "react";
import { Animated, View, StatusBar, Platform, Text, TouchableOpacity } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import LinearGradient from "react-native-linear-gradient";
import { User, ArrowRight, Settings, Bell, CreditCard, Shield } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const SwipeableQuickActions = ({ children }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [translateX] = useState(new Animated.Value(-280));

  const openPanel = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const closePanel = () => {
    Animated.spring(translateX, {
      toValue: -280,
      useNativeDriver: true,
    }).start();
  };

  const statusBarHeight = StatusBar.currentHeight || (Platform.OS === 'ios' ? 44 : 0);

  const quickActions = [
    { 
      icon: User, 
      label: t('quickActions.profile'), 
      color: "#60A5FA", 
      bgColor: "rgba(96, 165, 250, 0.15)",
      screen: "Profile"
    },
    { 
      icon: Settings, 
      label: t('quickActions.onboard'), 
      color: "#34D399", 
      bgColor: "rgba(52, 211, 153, 0.15)",
      screen: "Onboarding"
    },
    { 
      icon: Bell, 
      label: t('quickActions.setup'), 
      color: "#F59E0B", 
      bgColor: "rgba(245, 158, 11, 0.15)",
      screen: "Setup"
    },
    { 
      icon: CreditCard, 
      label: t('quickActions.sales'), 
      color: "#EF4444", 
      bgColor: "rgba(239, 68, 68, 0.15)",
      screen: "Sales"
    },
    { 
      icon: Shield, 
      label: t('quickActions.subscription'), 
      color: "#8B5CF6", 
      bgColor: "rgba(139, 92, 246, 0.15)",
      screen: "Subscription"
    },
  ];

  const handleActionPress = (action) => {
    console.log(`Navigating to: ${action.label} -> ${action.screen}`);
    
    // Close the panel first
    closePanel();
    
    // Navigate after a small delay for smooth animation
    setTimeout(() => {
      if (action.screen) {
        navigation.navigate(action.screen);
      }
    }, 300);
  };

  return (
    <GestureRecognizer
      onSwipeRight={openPanel}
      onSwipeLeft={closePanel}
      className="flex-1"
    >
      <Animated.View 
        className="absolute left-0 top-0 bottom-0 w-72 bg-white rounded-r-3xl shadow-xl z-50 overflow-hidden"
        style={{
          transform: [{ translateX }],
          shadowColor: "#000",
          shadowOffset: { width: 4, height: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 20,
          elevation: 20,
        }}
      >
        <LinearGradient
          colors={["#1E3A8A", "#3B82F6", "#60A5FA"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1 justify-start"
          style={{ 
            paddingTop: statusBarHeight + 10, 
            paddingHorizontal: 24, 
            paddingBottom: 24 
          }}
        >
          {/* Header */}
          <View className="mb-6">
            <Text className="text-white text-2xl font-bold mb-2">
              {t('quickActions.title')}
            </Text>
            <View className="w-12 h-1 bg-blue-300/70 rounded-full" />
          </View>

          {/* Actions List */}
          <View className="flex-1 justify-start">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleActionPress(action)}
                  activeOpacity={0.7}
                  className="flex-row items-center justify-between py-3.5 px-4 rounded-2xl mb-3"
                  style={{
                    backgroundColor: action.bgColor,
                    borderLeftWidth: 5,
                    borderLeftColor: action.color,
                  }}
                >
                  <View className="flex-row items-center">
                    <View className="w-10 h-10 bg-white/15 rounded-xl justify-center items-center mr-3.5">
                      <Icon size={22} color={action.color} />
                    </View>
                    <Text className="text-white text-base font-semibold">
                      {action.label}
                    </Text>
                  </View>
                  <ArrowRight size={20} color="rgba(255,255,255,0.7)" />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Footer */}
          <View className="items-center mt-3">
            <View className="flex-row items-center">
              <View className="w-1.5 h-1.5 bg-white/40 rounded-full mr-1.5" />
              <Text className="text-white/60 text-xs font-medium">
                {t('quickActions.swipeToClose')}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Main Content */}
      <View className="flex-1 bg-gray-50">
        {children}
      </View>
    </GestureRecognizer>
  );
};

export default SwipeableQuickActions;