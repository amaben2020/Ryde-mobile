// import { useUser } from '@clerk/clerk-expo';
// import { Image, ScrollView, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import InputField from '@/components/InputField';

// const Profile = () => {
//   const { user } = useUser();

//   return (
//     <SafeAreaView className="flex-1">
//       <ScrollView
//         className="px-5"
//         contentContainerStyle={{ paddingBottom: 120 }}
//       >
//         <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

//         <View className="flex items-center justify-center my-5">
//           <Image
//             source={{
//               uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
//             }}
//             style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
//             className=" rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
//           />
//         </View>

//         <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
//           <View className="flex flex-col items-start justify-start w-full">
//             <InputField
//               label="First name"
//               placeholder={user?.firstName || 'Not Found'}
//               containerStyle="w-full"
//               inputStyle="p-3.5"
//               editable={false}
//             />

//             <InputField
//               label="Last name"
//               placeholder={user?.lastName || 'Not Found'}
//               containerStyle="w-full"
//               inputStyle="p-3.5"
//               editable={false}
//             />

//             <InputField
//               label="Email"
//               placeholder={
//                 user?.primaryEmailAddress?.emailAddress || 'Not Found'
//               }
//               containerStyle="w-full"
//               inputStyle="p-3.5"
//               editable={false}
//             />

//             <InputField
//               label="Phone"
//               placeholder={user?.primaryPhoneNumber?.phoneNumber || 'Not Found'}
//               containerStyle="w-full"
//               inputStyle="p-3.5"
//               editable={false}
//             />
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Profile;

import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

import InputField from '@/components/InputField';

const Profile = () => {
  const { user } = useUser();
  const [imageUri, setImageUri] = useState(
    user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl
  );

  // Function to pick an image from the user's library
  const handleImagePick = async () => {
    // Ask for permission to access photos
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access photos is required!');
      return;
    }

    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // Update the image URI when an image is picked
      setImageUri(result?.assets[0]?.uri);

      // Send the image to the backend
      // await uploadImage(result.uri);
    }
  };

  // // Function to upload the image to the backend
  // const uploadImage = async (uri) => {
  //   try {
  //     // Convert the image URI to a file object
  //     const formData = new FormData();
  //     formData.append('file', {
  //       uri,
  //       name: 'profile.jpg', // You can dynamically set the name
  //       type: 'image/jpeg', // or 'image/png' depending on the image type
  //     });

  //     // Send the form data to the backend
  //     const response = await axios.post(
  //       'https://your-backend-api.com/upload',
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );

  //     console.log('Image uploaded successfully', response.data);
  //   } catch (error) {
  //     console.error('Error uploading image', error);
  //   }
  // };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView
        className="px-5"
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Text className="text-2xl font-JakartaBold my-5">My profile</Text>

        <View className="flex items-center justify-center my-5">
          {/* Use TouchableOpacity to make the image clickable */}
          <TouchableOpacity onPress={handleImagePick}>
            <Image
              source={{
                uri: imageUri,
              }}
              style={{ width: 110, height: 110, borderRadius: 110 / 2 }}
              className="rounded-full h-[110px] w-[110px] border-[3px] border-white shadow-sm shadow-neutral-300"
            />
          </TouchableOpacity>
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-5 py-3">
          <View className="flex flex-col items-start justify-start w-full">
            <InputField
              label="First name"
              placeholder={user?.firstName || 'Not Found'}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Last name"
              placeholder={user?.lastName || 'Not Found'}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Email"
              placeholder={
                user?.primaryEmailAddress?.emailAddress || 'Not Found'
              }
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />

            <InputField
              label="Phone"
              placeholder={user?.primaryPhoneNumber?.phoneNumber || 'Not Found'}
              containerStyle="w-full"
              inputStyle="p-3.5"
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
