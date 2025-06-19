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
 const samplePosts = [
  {
    id: "1",
    image_url: "https://res.cloudinary.com/dozcg1ra4/image/upload/v1747795861/fdybh1toyb60ewpohloh.jpg",
    caption: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?",
    stats: { likes: 1234, comments: 12, shares: 5, bookmarks: 0 },
    user: {
      username: "Abe",
      image_url: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg",
    },
  },
  {
    id: "2",
    image_url: "https://res.cloudinary.com/dozcg1ra4/image/upload/v1747796353/odtwfmbfjxwmg7sjwfs9.jpg",
    caption: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?",
    stats: { likes: 123, comments: 12, shares: 5, bookmarks: 0 },
    user: {
      username: "badimnotjustdev",
      image_url: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg",
    },
  },
  {
    id: "3",
    image_url: "https://res.cloudinary.com/dozcg1ra4/image/upload/v1747797073/tdnvxrdnpypmgmxrjzar.jpg",
    caption: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?",
    stats: { likes: 123, comments: 12, shares: 5, bookmarks: 0 },
    user: {
      username: "vadimnotjustdev",
      image_url: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg",
    },
  },
  {
    id: "4",
    image_url: "https://res.cloudinary.com/dozcg1ra4/image/upload/v1748033047/ygbtjvbtftef9xelmmpn.jpg",
    caption: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?",
    stats: { likes: 0, comments: 0, shares: 0, bookmarks: 0 },
    user: {
      username: "vadimnotjustdev",
      image_url: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/4.jpg",
    },
  },
];

const fetchPosts = async () => {
  const newPosts = samplePosts.map((post, i) => ({
    id: `${posts.length + i + 1}`,
    image_url: post.image_url,
    caption: post.caption,
    stats: post.stats,
    user: post.user,
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
