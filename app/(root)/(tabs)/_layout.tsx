import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          headerShown: false,
        }}
      />{' '}
      <Stack.Screen
        name="profile"
        options={{
          headerShown: false,
        }}
      />{' '}
      <Stack.Screen
        name="rides"
        options={{
          headerShown: false,
        }}
      />{' '}
    </Stack>
  );
};

export default Layout;
