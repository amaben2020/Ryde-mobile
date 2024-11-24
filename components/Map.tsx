import { View, Text } from 'react-native';
import React from 'react';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';

const Map = () => {
  return (
    <MapView
      style={{ width: '100%', height: '100%', borderRadius: 20 }}
      provider={PROVIDER_DEFAULT}
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      showsUserLocation={true}
      userInterfaceStyle="light"
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Text> </Text>
    </MapView>
  );
};

export default Map;
