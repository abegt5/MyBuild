import { useState } from "react";
import {
  TouchableOpacity,
  Image,
  View,
  ScrollView,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

import { auth, db } from "../../Firebase"; // adjust the path if needed
import { collection, addDoc, serverTimestamp } from "firebase/firestore";


export default function AddPostScreen() {
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
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        className="flex-grow bg-black"
      >
        <View className="items-center ">
          {/* button to choose post type */}
          <View className="flex-row justify-around items-center bg-white/15 rounded-2xl px-3 py-2">
            {/* Garage Button */}
            <TouchableOpacity
              onPress={() => setPostType("feed")}
              className={`items-center mx-2 px-4 py-1 rounded-xl ${
                postType === "feed" ? "bg-[#4C89D9]" : ""
              }`}
            >
              <Text
                className={`text-lg font-semibold ${
                  postType === "feed" ? "text-white" : "text-white/60"
                }`}
              >
                Garage
              </Text>
            </TouchableOpacity>

            {/* Explore Button */}
            <TouchableOpacity
              onPress={() => setPostType("explore")}
              className={`items-center mx-1 px-3 py-1 rounded-xl ${
                postType === "explore" ? "bg-[#4C89D9]" : ""
              }`}
            >
              <Text
                className={`text-lg font-semibold ${
                  postType === "explore" ? "text-white" : "text-white/60"
                }`}
              >
                Explore
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={pickMediaItems}
            className={`w-full ${hasChosen ? "h-0" : "h-96"}  bg-blue-300/20 rounded-lg items-center justify-center mt-2 mb-2 `}
          >
            <Text className="text-white text-3xl font-bold">+</Text>
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
            <Text className="text-lg font-semibold text-white mb-2 text-start">
              Caption
            </Text>
            <TextInput
              className="border border-gray-400 rounded-lg bg-gray-100 p-2 text-black h-24"
              placeholder="Type caption here..."
              multiline
              value={caption}
              onChangeText={setCaption}
            />
          </View>

          <TouchableOpacity
            onPress={handlePost}
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