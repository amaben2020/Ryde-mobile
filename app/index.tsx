import { SignedIn, SignedOut, useAuth, useUser } from '@clerk/clerk-expo';
import { Link, Redirect } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={'/(root)/(tabs)/home'} />;
  }

  return <Redirect href={'/(auth)/welcome'} />;
}
