import React, { useState, useEffect } from "react";
import { FlatList, View, Dimensions } from "react-native";
import PostListItem from "../components/explorePostListItem"; // Assuming it's in components

const screenHeight = Dimensions.get("window").height;

export default function ExploreScreen() {
  const [posts, setPosts] = useState([]);

  // Fetch or simulate posts
  const fetchPosts = async () => {
    // Replace this with your API call
    const newPosts = Array.from({ length: 10 }, (_, i) => ({
      id: `${posts.length + i}`,
      image_url: "https://res.cloudinary.com/dozcg1ra4/image/upload/v1747795861/fdybh1toyb60ewpohloh.jpg", // Placeholder
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
  );
}
