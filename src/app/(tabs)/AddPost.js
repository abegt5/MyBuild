import { useState } from 'react';
import { TouchableOpacity, Image, View, ScrollView, Text, TextInput, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';


export default function AddPostScreen() {
  const [mediaItems, setMediaItems] = useState([]);
  const [caption, setCaption] = useState('');
  const [hasChosen, setHasChosen] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  const pickMediaItems = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsMultipleSelection: true,
      //allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const newItems = result.assets.map((asset) => ({
        uri: asset.uri,
        type: asset.type, // "image" or "video"
      }));
  
      setMediaItems(newItems);
      setHasChosen(true);
    }
  };

  return (
    <GestureHandlerRootView className="flex-1 bg-black">
      <ScrollView contentContainerStyle={{ padding: 16 }} className="flex-grow">
        <View className="items-center">
        <TouchableOpacity
  onPress={pickMediaItems}

  className={`w-full ${hasChosen ? 'h-0' : 'h-96'} bg-gray-400 bg-opacity-50 rounded-lg items-center justify-center mt-6 mb-4`}
>
  <Text className="text-white text-3xl font-bold">+</Text>
</TouchableOpacity>

<FlatList
  data={mediaItems}
  renderItem={({ item }) => (
    <Image
      source={{ uri: item.uri }}
      style={{
        width: 330,
        aspectRatio: 1,
        borderRadius: 12,
        marginVertical: 16,
      }}
    />
  )}
  keyExtractor={(item) => item.uri}
  horizontal
  showsHorizontalScrollIndicator={false}
  ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
  contentContainerStyle={{ paddingHorizontal: 8 }}
/>

          <View className="w-full">
            <Text className="text-lg font-semibold text-white mb-2 text-start">Caption</Text>
            <TextInput
              className="border border-gray-400 rounded-lg bg-gray-100 p-2 text-black h-24"
              placeholder="Type caption here..."
              multiline
              value={caption}
              onChangeText={setCaption}
            />
          </View>

          <TouchableOpacity
  onPress={pickMediaItems}
  className="w-[30%] bg-[#4C89D9] p-4 rounded-lg mb-4 mt-12"
>
  <Text className="text-white text-center font-semibold text-lg">
    Post
  </Text>
</TouchableOpacity>
        </View>
      </ScrollView>
      
    </GestureHandlerRootView>
);
}

