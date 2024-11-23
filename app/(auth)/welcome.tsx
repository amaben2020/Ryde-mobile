import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Swiper from 'react-native-swiper';

const Welcome = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex h-full items-center justify-between">
      {/* TODO: move to skip component that accepts a route link */}
      <TouchableOpacity
        className="w-full justify-end flex items-end p-5"
        onPress={() => router.push('/(auth)/sign-up')}
      >
        <Text className="text-black font-JakartaBold font-medium">Skip</Text>
      </TouchableOpacity>

      <Swiper loop={false}>ok</Swiper>
    </SafeAreaView>
  );
};

export default Welcome;
