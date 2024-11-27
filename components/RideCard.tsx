import { View, Text, Image } from 'react-native';
import React from 'react';
import { Ride } from '@/types/type';
import { icons } from '@/constants';
import { formatDate, formatTime } from '@/lib/utils';
import clsx from 'clsx';

const RideCard = ({ item }: { item: Ride }) => {
  return (
    <View className="py-3 px-4 rounded-lg bg-white shadow-sm shadow-neutral-300 my-3">
      <View className="flex flex-row gap-x-10 items-center w-full py-4">
        <Image
          source={{
            uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${item?.destination_longitude},${item?.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
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
              {item?.origin_address}
            </Text>
          </View>
          <View className="flex flex-row gap-x-5 items-center">
            <Image
              source={icons.point}
              className="h-[24px] w-[24px] rounded-[10px]"
            />
            <Text className="font-Jakarta font-medium text-[13px]">
              {item?.destination_address ?? ''}
            </Text>
          </View>
        </View>
      </View>

      <View className="rounded-[10px] bg-general-500 p-6 flex flex-col  ">
        <View className="flex flex-row justify-between items-center border-white border-b pb-4">
          <Text className="text-lg font-semibold font-Jakarta text-gray-500 text-[13px]">
            Date & Time
          </Text>
          <Text className="text-lg font-semibold font-JakartaSemiBold text-[13px]">
            {formatDate(item?.created_at)}, {formatTime(item?.ride_time)}
          </Text>
        </View>

        <View className="flex flex-row justify-between items-center border-white border-b py-3">
          <Text className="text-lg font-semibold font-Jakarta text-gray-500 text-[13px]">
            Driver
          </Text>
          <Text className="text-lg font-semibold font-JakartaSemiBold text-[13px]">
            {item?.driver?.first_name} {item?.driver?.last_name}
          </Text>
        </View>

        <View className="flex flex-row justify-between items-center border-white border-b py-3">
          <Text className="text-lg font-semibold font-Jakarta text-gray-500 text-[13px]">
            Car Seats
          </Text>
          <Text className="text-lg font-semibold font-JakartaSemiBold text-[13px]">
            {item?.driver.car_seats}
          </Text>
        </View>
        <View className="flex flex-row justify-between items-center border-white py-3">
          <Text className="text-lg font-semibold font-Jakarta text-gray-500 text-[13px]">
            Payment Status
          </Text>
          <Text
            className={clsx(
              item?.payment_status === 'paid' && 'text-green-600 capitalize',
              'text-lg font-semibold font-JakartaSemiBold text-[13px]'
            )}
          >
            {item?.payment_status}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RideCard;
