import { View, Text, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '@/constants';
import InputField from '@/components/InputField';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  return (
    <ScrollView className="flex flex-1 bg-white">
      <View className="flex-1 bg-white">
        <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />

        <Text className="text-2xl text-black font-JakartaSemiBold">
          Create your account
        </Text>
      </View>
      <View className="p-5 text-black">
        <InputField
          label="Name"
          placeholder="Enter your name"
          icon={icons.person}
          onChangeText={(value) => setForm({ ...form, name: value })}
        />
      </View>
      <View className="p-5 text-black">
        <InputField
          label="Email"
          placeholder="Enter your email"
          icon={icons.email}
          onChangeText={(value) => setForm({ ...form, name: value })}
        />
      </View>{' '}
      <View className="p-5 text-black">
        <InputField
          label="Password"
          placeholder="Enter your password"
          icon={icons.lock}
          secureTextEntry={true}
          onChangeText={(value) => setForm({ ...form, name: value })}
        />
      </View>
    </ScrollView>
  );
};

export default Signup;
