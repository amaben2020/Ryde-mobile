import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '../../../constants/index';
import RideCard from '@/components/RideCard';
import { useAuth, useUser } from '@clerk/clerk-expo';
import GoogleTextInput from '@/components/GoogleTextInput';
import Map from '@/components/Map';
import { useLocationStore } from '@/store';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useFetch } from '@/lib/fetch';

// basically your ride info from, to, driver, amount paid

const Home = () => {
  const { user } = useUser();
  const router = useRouter();

  const { isSignedIn, sessionId } = useAuth();

  const { setUserLocation, setDestinationLocation, userLatitude } =
    useLocationStore();

  const { signOut } = useAuth();

  const [hasPermission, setHasPermission] = useState(true);

  const handleSignOut = async () => {
    await signOut();
  };

  useEffect(() => {
    if (!isSignedIn && !sessionId) router.push('/(auth)/sign-in');
  }, [isSignedIn]);

  const handleDestinationPress = (location: {
    longitude: number;
    latitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push('/(root)/find-ride');
  };

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setHasPermission(false);

        return;
      }

      let location = await Location.getCurrentPositionAsync();

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    };

    requestLocation();
  }, []);

  const { data: rides, loading } = useFetch('/(api)/ride/rides');

  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        data={Array.isArray(rides) ? rides.slice(0, 5) : []}
        renderItem={({ item }) => <RideCard item={item} />}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <Text>Empty</Text>
            ) : loading ? (
              <ActivityIndicator color="#000" className="py-3" />
            ) : (
              <>
                <Image source={images.noResult} className="w-40 h-40" />

                <Text>No recent rides found</Text>
              </>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex flex-row items-center justify-between my-5">
              <Text className="capitalize font-JakartaBold text-xl">
                Welcome,{' '}
                {user?.firstName ||
                  user?.emailAddresses[0].emailAddress.split('@')[0]}{' '}
              </Text>

              <TouchableOpacity
                onPress={handleSignOut}
                className="w-12 h-12 rounded-full p-5 bg-white flex flex-row items-center justify-center"
              >
                <Image source={icons.out} className="w-8 h-8" />
              </TouchableOpacity>
            </View>

            {/* Search Here */}
            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-md shadow-neutral-300"
              handlePress={handleDestinationPress}
            />

            <View className="h-[330px] my-5" style={{ borderRadius: 20 }}>
              <Map />
            </View>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
