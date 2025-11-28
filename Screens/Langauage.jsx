import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  I18nManager,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { changeLanguage } from '../i18n';

const languages = [
  { code: 'en', label: 'English', image: require('../asstes/English.png') },
  { code: 'ar', label: 'Arabic', image: require('../asstes/Arabic.png') },
  { code: 'fr', label: 'French', image: require('../asstes/French.png') },
  { code: 'de', label: 'German', image: require('../asstes/German.png') },
];

const Language = () => {
  const [selected, setSelected] = useState('en');
  const navigation = useNavigation();

  // Define explicit order you want
  const order = ['en', 'ar', 'fr', 'de'];

  // Create a NEW sorted array, don't sort original in place
  const sortedLanguages = [...languages].sort(
    (a, b) => order.indexOf(a.code) - order.indexOf(b.code)
  );

  const onSelectLanguage = async (code) => {
    setSelected(code);
    await changeLanguage(code);
    console.log('Selected:', code);

    // const isRTL = code === 'ar';
    // I18nManager.allowRTL(isRTL);
    // I18nManager.forceRTL(isRTL);

    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View className="flex-1 bg-white pt-16 items-center justify-center px-6">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Text className="text-2xl font-bold mb-10">Select Language</Text>

      <View className="w-full max-w-md flex-row flex-wrap justify-center">
        {sortedLanguages.map(({ code, label, image }, index) => (
          <TouchableOpacity
            key={code}
            onPress={() => onSelectLanguage(code)}
            activeOpacity={0.7}
            className={`
              w-[48%] aspect-[1.1] bg-white rounded-md border
              items-center justify-center pt-4 pb-4 px-3
              mb-6
              ${(index + 1) % 2 === 0 ? '' : 'mr-3'}
              ${selected === code ? 'border-black border-2' : 'border-gray-300 border'}
            `}
          >
            <Image
              source={image}
              className="w-3/4 h-3/5 mb-3"
              resizeMode="contain"
            />
            <Text className="text-base font-normal text-black mt-1">{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Language;
