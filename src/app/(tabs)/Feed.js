import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import StoryListItem from "../../components/Story";
import posts from "../../../assets/data/posts.json";
import stories from "../../../assets/data/stories.json"; // Import stories data
import PostListItem from "../../components/PostListItem";

export default function FeedScreen() {
  const [selectedStory, setSelectedStory] = useState(null);

  // Handle story click to show full-screen
  const handleStoryPress = (story) => {
    setSelectedStory(story);
  };

  // Close the full-screen story view
  const closeStory = () => {
    setSelectedStory(null);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Story Section */}
      <View className="px-0 py-1.5 bg-black">
        <FlatList
          data={stories}
          horizontal
          renderItem={({ item }) => (
            <StoryListItem story={item} onPress={() => handleStoryPress(item)} />
          )}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ paddingVertical: 1, gap: 2 }}
        />
      </View>

      {/* Display Full-Screen Story */}
      {selectedStory && (
        <View className="absolute inset-0 bg-black bg-opacity-80 justify-center items-center z-10">
        <TouchableOpacity
  onPress={closeStory}
  className="absolute inset-0 bg-black bg-opacity-80 justify-center items-center z-10"
  activeOpacity={1}
>
  <Text className="text-white text-2xl font-bold mb-4">
    {selectedStory.user.username}
  </Text>
  <Image
    source={{ uri: selectedStory.image_url }}
    className="w-[90%] h-[80%] object-contain rounded-xl"
  />
</TouchableOpacity>
        </View>
      )}

      {/* Posts Section */}
      <View className="flex-1">
        <FlatList
          data={posts}
          renderItem={({ item }) => <PostListItem post={item} />}
          contentContainerStyle={{ gap: 0, maxWidth: 512, width: '100%'}}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
