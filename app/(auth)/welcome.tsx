import { View, Text, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Swiper from 'react-native-swiper';
import { onboarding } from '@/constants';

const Welcome = () => {
  const router = useRouter();
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  return (
    <SafeAreaView className="flex h-full items-center justify-between">
      {/* TODO: move to skip component that accepts a route link */}
      <TouchableOpacity
        className="w-full justify-end flex items-end p-5"
        onPress={() => router.push('/(auth)/sign-up')}
      >
        <Text className="text-black font-JakartaBold font-medium">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] mx-1 bg-[#e2e8f0] h-[8px] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] mx-1 bg-[#0286ff] h-[4px] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Text> {item.title}</Text>
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

export default Welcome;
