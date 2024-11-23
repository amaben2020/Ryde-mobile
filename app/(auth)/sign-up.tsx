import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { icons, images } from '@/constants';
import InputField from '@/components/InputField';
import CustomButton from '@/components/CustomButton';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import ReactNativeModal from 'react-native-modal';
import { fetchAPI } from '@/lib/fetch';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();
  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });

  const handleGoogleSignIn = () => {};

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setVerification({ ...verification, state: 'pending' });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: String(verification.code),
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: 'success' });

        await fetchAPI('/user', {
          method: 'POST',
          body: JSON.stringify({
            clerkId: completeSignUp.createdUserId,
            name: form.name,
            email: form.email,
          }),
        });

        // after all is said and done
        setShowSuccessModal(true);
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      setVerification({
        ...verification,
        state: 'failed',
        error: err.errors[0].longMessage,
      });
    }
  };

  return (
    <ScrollView className="flex flex-1 bg-white">
      <View className="flex-1 bg-white">
        <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />

        <Text className="text-2xl text-black font-JakartaSemiBold px-3">
          Create your account
        </Text>
      </View>
      <View className="p-5 text-black">
        <InputField
          label="Name"
          placeholder="Enter your name"
          icon={icons.person}
          onChangeText={(value) => setForm({ ...form, name: value })}
          value={form.name}
        />
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
      </View>{' '}
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
          <CustomButton title="Sign up" onPress={onSignUpPress} />

          <View className="flex flex-row items-center">
            <View className="flex-1 h-[1px] bg-general-100" />
            <Text className="w-16 align-[40px] text-center justify-start items-start  ">
              Or
            </Text>
            <View className="flex-1 h-[1px] bg-general-100" />
          </View>

          <CustomButton
            title="Sign up"
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
          <Text className="text-3xl font-JakartaBold text-center">
            Verified
          </Text>

          <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
            You have successfully verified your account
          </Text>

          <CustomButton
            title="Browse Home"
            className="mt-5"
            onPress={
              onSignUpPress
              // () => router.push('/(root)/(tabs)/home')
            }
          />
        </View>
      </ReactNativeModal>
      <ReactNativeModal
        isVisible={verification.state === 'pending'}
        onModalHide={() => {
          setVerification({ ...verification, state: 'success' });
          router.push('/(root)/(tabs)/home');
        }}
      >
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Text className="text-3xl font-JakartaBold text-center mb-2">
            Verification
          </Text>

          <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
            We have sent a verification code to{' '}
            {form.email ? form.email : 'your email'}
          </Text>

          <InputField
            label="Code"
            icon={icons.lock}
            value={verification.code}
            keyboardType="numeric"
            onChangeText={(value) =>
              setVerification({ ...verification, code: value })
            }
            placeholder="Enter verification code"
          />

          {verification.error && (
            <Text className="text-red-500 text-sm mt-1">
              {verification.error}
            </Text>
          )}

          <CustomButton
            title="Verify Email"
            className="mt-5 bg-success-500"
            onPress={onPressVerify}
          />
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

export default Signup;
