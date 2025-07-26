import { useState } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { auth, db } from "../../Firebase"; // adjust the path if needed
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

{/* 
TODO
- when keyboard is open, scroll up to show the input field 
- combine the flatlist and the tapable add post button together
*/}


export default function AddPostScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const [mediaItems, setMediaItems] = useState([]);
  const [caption, setCaption] = useState("");
  const [hasChosen, setHasChosen] = useState(false);
  const [postType, setPostType] = useState("'feed'"); // 'feed' or 'explore'
  const router = useRouter();

  const uploadToCloudinary = async (mediaItem) => {
    const data = new FormData();

    data.append("file", {
      uri: mediaItem.uri,
      type: mediaItem.type === "image" ? "image/jpeg" : "video/mp4",
      name: `upload.${mediaItem.type === "image" ? "jpg" : "mp4"}`,
    });
    data.append("upload_preset", "MyBuild");

    const cloudName = "dozcg1ra4";
    const resourceType = mediaItem.type === "image" ? "image" : "video";

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      {
        method: "POST",
        body: data,
      },
    );

    const result = await res.json();
    return result.secure_url;
  };

  const handlePost = async () => {
  try {
    const uploadedUrls = [];

    for (const item of mediaItems) {
      const url = await uploadToCloudinary(item);
      uploadedUrls.push(url);
    }

    // Save post data to Firebase Firestore
    await addDoc(collection(db, "posts"), {
      caption,
      media: uploadedUrls,
      postType,
      user: auth.currentUser.uid,
      createdAt: serverTimestamp(),
    });

    // Reset
    setMediaItems([]);
    setCaption("");
    setHasChosen(false);
    alert("Post uploaded!");
    router.push("/Feed");
  } catch (err) {
    console.error("Upload failed", err);
    alert("Upload failed");
  }
};


  const pickMediaItems = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Use "position" if padding doesn't work
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // Adjust depending on your header/nav height
    >
      <ScrollView
       keyboardShouldPersistTaps="handled" // tap isnt lost, will close keyboard and allows buttons to work
        contentContainerStyle={{ padding: 18, paddingBottom: tabBarHeight + 20 }}
        className="flex-grow bg-[#F2F2F7]"
      >
        <View className="items-center ">
          {/* button to choose post type */}
          {/* TODO: change width and height of this but make it so its based on device */}
          <View className="flex-row justify-around items-center bg-primary/15 rounded-2xl px-14 py-3">
            {/* Garage Button */}
            <TouchableOpacity
              onPress={() => setPostType("feed")}
              className={`items-center mx-2 px-6 py-2 rounded-xl ${
                postType === "feed" ? "bg-secondary" : ""
              }`}
            >
              <Text
                className={`text-xl font-semibold ${
                  postType === "feed" ? "text-primary" : "text-primary/60"
                }`}
              >
                Garage
              </Text>
            </TouchableOpacity>

            {/* Explore Button */}
            <TouchableOpacity
              onPress={() => setPostType("explore")}
              className={`items-center mx-1 px-6 py-2 rounded-xl ${
                postType === "explore" ? "bg-secondary" : ""
              }`}
            >
              <Text
                className={`text-xl font-semibold ${
                  postType === "explore" ? "text-primary" : "text-primary/60"
                }`}
              >
                Explore
              </Text>
            </TouchableOpacity>
          </View>


          <TouchableOpacity
            onPress={pickMediaItems}
            className={`w-full ${hasChosen ? "h-0" : "h-96"}  bg-[#1C1C1E] rounded-lg items-center justify-center mt-8 mb-2 border-dashed border-2 border-gray-500`}
          >
          <View style={{width: 50,height: 50,borderRadius: 8,backgroundColor: '#D9D9D9', justifyContent: 'center',alignItems: 'center',}}>
            <Text className="text-white text-4xl font-regular">+</Text>
          </View>

            <Text className="text-white text-xl font-bold mt-2">
              Add Photo/Video
            </Text>
            <Text className="text-gray-400 text-sm font-regular mt-1">
              Tap to select from gallery
            </Text>
          </TouchableOpacity>

          <FlatList
            data={mediaItems}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={pickMediaItems}>
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    width: 330,
                    aspectRatio: 1,
                    borderRadius: 12,
                    marginVertical: 16,
                  }}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.uri}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 12 }} />}
            contentContainerStyle={{ paddingHorizontal: 8 }}
          />

          <View className="w-full">
            <Text className="text-xl font-bold text-primary mb-2 text-start">
              Caption
            </Text>
            <TextInput
              className="border border-gray-400 rounded-lg bg-gray-100 p-2 text-black h-36"
              placeholder="Share details about your post"
              multiline
              value={caption}
              onChangeText={setCaption}
            />
          </View>

          <TouchableOpacity
            onPress={handlePost}
            className="w-[30%] bg-[#007AFF] p-4 rounded-lg mb-4 mt-12"
          >
            <Text className="text-white text-center font-semibold text-lg">
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}