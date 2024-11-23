import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import OAuth from '@/components/OAuth';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onSignupPress = () => {
    Alert.alert('Email clicked', 'This was clicked');
  };

  const handleGoogleSignIn = () => {};

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
      <View>
        <View className="flex flex-col space-y-5 gap-y-7 justify-center items-center mt-4 gap-x-3 w-10/12 item-center mx-auto">
          <CustomButton title="Sign up" onPress={onSignupPress} />

          <View className="flex flex-row items-center">
            <View className="flex-1 h-[1px] bg-general-100" />
            <Text className="w-16 align-[40px]  text-center     justify-start items-start  ">
              Or
            </Text>
            <View className="flex-1 h-[1px] bg-general-100" />
          </View>

          <CustomButton
            title="Sign up"
            onPress={onSignupPress}
            bgVariant="outline"
            IconLeft={() => (
              <Image
                source={icons.google}
                resizeMode="contain"
                className="w-5 h-5 mx-2"
              />
            )}
            textVariant="primary"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;
