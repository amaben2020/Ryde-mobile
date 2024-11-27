import React, { useEffect, useMemo, useState } from 'react';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { useDriverStore, useLocationStore } from '@/store';
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from '@/lib/map';
import { Driver, MarkerData } from '@/types/type';
import { icons } from '@/constants';
import { useFetch } from '@/lib/fetch';
import { ActivityIndicator, Text, View, Platform } from 'react-native';

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

  const directionsAPI = '1162aa471c2bef83';

  const { data: drivers, loading, error } = useFetch<Driver[]>('/(api)/driver');

  const { selectedDriver, setSelectedDriver, setDrivers } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);

  const region =
    userLongitude &&
    userLatitude &&
    useMemo(
      () =>
        calculateRegion({
          userLongitude,
          userLatitude,
          destinationLatitude,
          destinationLongitude,
        }),
      []
    );

  // Function to simulate real-time movement
  const updateDriverLocations = () => {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) => {
        // Small random movement to simulate driver movement
        const latOffset = (Math.random() - 0.5) * 0.001; // smaller offset for smooth movement
        const lngOffset = (Math.random() - 0.5) * 0.001;

        return {
          ...marker,
          latitude: marker.latitude + latOffset,
          longitude: marker.longitude + lngOffset,
        };
      })
    );
  };

  // Initialize markers
  useEffect(() => {
    if (!loading) {
      //@ts-ignore
      setDrivers(drivers!);
    }
    if (Array.isArray(drivers) && !loading) {
      if (!userLatitude || !userLongitude) return;

      // Create initial markers based on user's location
      const initialMarkers = generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });

      setMarkers(initialMarkers);
    }
  }, [userLatitude, userLongitude, drivers]);

  // Simulate real-time updates with a timer (every 2 seconds)
  useEffect(() => {
    const interval = setInterval(updateDriverLocations, 1000); // Update every 2 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    if (
      markers.length > 0 &&
      destinationLatitude !== undefined &&
      destinationLongitude !== undefined
    ) {
      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        destinationLatitude,
        destinationLongitude,
      }).then((drivers) => {
        console.log('INSIDE', drivers);
        setDrivers(drivers as MarkerData[]);
      });
    }
  }, [destinationLatitude, destinationLongitude, region]);

  if (loading || !userLatitude || !userLongitude) {
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator color="#000" size="small" />
      </View>
    );
  }

  if (error) {
    <Text>Error {error}</Text>;
  }

  if (!drivers) {
    <View className="flex justify-between items-center w-full">
      <Text>Drivers not found</Text>
    </View>;
  }

  return (
    <MapView
      style={{ width: '100%', height: '100%' }}
      provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
      tintColor="black"
      mapType={Platform.OS === 'android' ? 'standard' : 'mutedStandard'}
      showsPointsOfInterest={false}
      showsUserLocation={true}
      userInterfaceStyle="light"
      //@ts-ignore
      initialRegion={region!}
      zoomTapEnabled={true}
    >
      {markers?.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}

      {/* {destinationLatitude && destinationLongitude && (
        <>
          <Marker
            key="destination"
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title="Destination"
            image={icons.pin}
          />
          <MapViewDirections
            origin={{
              latitude: userLatitude!,
              longitude: userLongitude!,
            }}
            destination={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            apikey={directionsAPI!}
            strokeColor="#0286FF"
            strokeWidth={2}
          />
        </>
      )} */}
    </MapView>
  );
};

export default Map;
