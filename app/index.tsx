import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  return (
    <SafeAreaView className="flex flex-row border">
      <Text className="text-[50px] font-JakartaExtraBold">Hello</Text>

      <Text className="text-[50px] font-JakartaExtraBold">Hello</Text>
    </SafeAreaView>
  );
};

export default Home;
