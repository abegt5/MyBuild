import React, { useState, useEffect } from "react";
import { FlatList, View, Dimensions, TouchableOpacity, Text } from "react-native";
import PostListItem from "../../components/explorePostListItem"; // Assuming it's in components
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from "expo-router";

const screenHeight = Dimensions.get("window").height;

export default function ExploreScreen() {
  const [friendsOnly, setFriendsOnly] = useState(false);
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  // Fetch or simulate posts
  const fetchPosts = async () => {
    // Replace this with your API call
    const newPosts = Array.from({ length: 10 }, (_, i) => ({
      id: `${posts.length + i}`,
      image_url: "https://res.cloudinary.com/dozcg1ra4/image/upload/v1747797073/tdnvxrdnpypmgmxrjzar.jpg", // Placeholder
      caption: "This is a cool post caption that goes on...",
      stats: { likes: 1240, comments: 48, shares: 20, bookmarks: 10 },
      user: {
        username: `user${posts.length + i}`,
        image_url: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg"
      }
    }));
    setPosts(prev => [...prev, ...newPosts]);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View className="flex-1 bg-black">

    {/* Header */}

    {/* Header Toggle */}
      <View className="absolute top-12 left-2 flex-row items-center z-10">
        <View className="flex-row justify-around items-center bg-white/15 rounded-2xl px-1 py-1">

      <TouchableOpacity onPress={() => setFriendsOnly(false)} className="items-center mx-1">
        <FontAwesome5
          name="globe"
          size={24}
          color={!friendsOnly ? "#4C89D9" : "black"}
        />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setFriendsOnly(true)} className="items-center mx-1">
        <FontAwesome5
          name="user-friends"
          size={24}
          color={friendsOnly ? "#4C89D9" : "black"}
        />
      </TouchableOpacity>
    </View>
      </View>

      {/* Back Button */}
      <View className="absolute top-12 right-2 flex-row items-center z-10">
         <TouchableOpacity
                          onPress={() => router.push('/Feed')}
                          style={{ marginRight: 0 }}
                        >
                          <Text className= "text-white text-xl font-bold justify-around items-center bg-white/15 rounded-2xl px-2 py-1">
                            Garage
                          </Text>
                        </TouchableOpacity>
      </View>


    <View className="flex-1 bg-black">
      
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ height: screenHeight }}>
          <PostListItem post={item} />
        </View>
      )}
      onEndReached={fetchPosts}
      onEndReachedThreshold={0.5}
      pagingEnabled // Makes FlatList scroll 1 full post per swipe
      showsVerticalScrollIndicator={false}
    />
    </View>
    </View>
  );
}
