import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import '../global.css';
import { useFonts } from 'expo-font';

export default function RootLayout() {
  SplashScreen.preventAutoHideAsync();
  const [loaded] = useFonts({
    'Jakarta-Bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    'Jakarta-ExtraBold': require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    'Jakarta-ExtraLight': require('../assets/fonts/PlusJakartaSans-ExtraLight.ttf'),
    'Jakarta-Light': require('../assets/fonts/PlusJakartaSans-Light.ttf'),
    'Jakarta-Medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    'Jakarta-Regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    'Jakarta-SemiBold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
  });

  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="index" />
      <Stack.Screen options={{ headerShown: false }} name="(tabs)" />
      <Stack.Screen options={{ headerShown: false }} name="(auth)" />
      <Stack.Screen options={{ headerShown: false }} name="+not-found" />
    </Stack>
  );
}
