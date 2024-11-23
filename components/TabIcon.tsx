import { View, Text, Image, ImageSourcePropType } from 'react-native';
import React from 'react';

const TabIcon = ({
  focused,
  source,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => {
  return (
    <View
      className={`flex flex-row justify-center items-center rounded-full ${
        focused ? 'bg-general-300' : ''
      }`}
    >
      <View
        className={`rounded-full w-12 h-12 items-center justify-center ${
          focused ? 'bg-general-400' : ''
        }`}
      >
        <Image source={source} tintColor="white" resizeMode="contain" />
      </View>
    </View>
  );
};

export default TabIcon;
