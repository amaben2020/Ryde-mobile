import { FlatList, View } from 'react-native';
import React from 'react';
import RideLayout from '@/components/RideLayout';
import { useDriverStore } from '@/store';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import DriverCard from '@/components/DriverCard';

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  return (
    <RideLayout title={'Choose a driver'} snapPoints={['65%', '85%']}>
      <FlatList
        data={drivers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(item.id!)}
          />
        )}
        ListFooterComponent={() => (
          <View>
            <CustomButton
              title="Select Ride"
              onPress={() => router.push('/(root)/book-ride')}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
