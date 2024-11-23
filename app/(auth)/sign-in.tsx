import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import ReactNativeModal from 'react-native-modal';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const { isLoaded, signIn, setActive } = useSignIn();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = () => {};

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        setShowSuccessModal(true);
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors[0].longMessage);
    }
  };

  return (
    <ScrollView className="flex flex-1 bg-white">
      <View className="flex-1 bg-white">
        <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />

        <Text className="text-2xl text-black font-JakartaSemiBold px-3">
          Sign in to your account
        </Text>
      </View>
      <View className="p-5 text-black">
        <InputField
          label="Email"
          placeholder="Enter your email"
          icon={icons.email}
          onChangeText={(value) => setForm({ ...form, email: value })}
          value={form.email}
          textContentType="emailAddress"
        />
      </View>
      <View className="p-5 text-black">
        <InputField
          label="Password"
          placeholder="Enter your password"
          icon={icons.lock}
          secureTextEntry={true}
          onChangeText={(value) => setForm({ ...form, password: value })}
          value={form.password}
        />
      </View>
      <View>
        <View className="flex flex-col space-y-5 gap-y-7 justify-center items-center mt-4 gap-x-3 w-10/12 item-center mx-auto">
          <CustomButton title="Sign in" onPress={onSignInPress} />

          <View className="flex flex-row items-center">
            <View className="flex-1 h-[1px] bg-general-100" />
            <Text className="w-16 align-[40px] text-center justify-start items-start  ">
              Or
            </Text>
            <View className="flex-1 h-[1px] bg-general-100" />
          </View>

          <CustomButton
            title="Sign in"
            onPress={handleGoogleSignIn}
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
      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={images.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-3xl font-JakartaBold text-center">Success</Text>

          <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
            You have successfully logged in
          </Text>

          <CustomButton
            title="Browse Home"
            className="mt-5"
            onPress={() => {
              onSignInPress();
              router.push('/(root)/(tabs)/home');
            }}
          />
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

export default SignIn;
