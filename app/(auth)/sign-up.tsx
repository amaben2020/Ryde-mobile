import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { images } from '@/constants';

const Signup = () => {
  return (
    <ScrollView className="flex flex-1 bg-white">
      <View className="flex-1 bg-white">
        <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />

        <Text className="text-2xl text-black font-JakartaSemiBold">
          Create your account
        </Text>
      </View>

      <View className="p-5 text-black">
        <Text>OK</Text>
      </View>
    </ScrollView>
  );
};

export default Signup;
