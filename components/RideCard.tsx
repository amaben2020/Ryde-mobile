import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { Ride } from '@/types/type';
import signUpCar from '@/assets/images/signup-car.png';
import { icons } from '@/constants';

const RideCard = ({ item }: { item: Ride }) => {
  return (
    <View className="p-4 rounded-lg bg-white shadow-sm shadow-neutral-300">
      <View className="flex flex-row gap-x-10 items-center border w-full py-4">
        <Image
          source={{
            uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${item.destination_longitude},${item.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
          }}
          className="h-[90px] w-[80px] rounded-[10px]"
        />

        <View className="flex flex-col gap-4">
          <View className="flex flex-row gap-x-5 items-center">
            <Image
              source={icons.to}
              className="h-[24px] w-[24px] rounded-[10px]"
            />
            <Text className="font-Jakarta font-medium text-[13px]">
              1901 Thornridge Cir. Shiloh
            </Text>
          </View>
          <View className="flex flex-row gap-x-5 items-center">
            <Image
              source={icons.point}
              className="h-[24px] w-[24px] rounded-[10px]"
            />
            <Text className="font-Jakarta font-medium text-[13px]">
              4140 Parker Rd. Allentown
            </Text>
          </View>
        </View>
      </View>

      <View></View>
    </View>
  );
};

export default RideCard;
