import { View, Text, Image, TouchableOpacity } from "react-native";

export default function StoryListItem({ story, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="items-center ">
        {/* Story Image */}
        <Image
          source={{ uri: story.image_url }}
          className="w-20 h-20 rounded-full border-0 border-blue-500"
        />
        <Text className="text-secondary mt-1 text-xs">{story.user.username}</Text>
      </View>
    </TouchableOpacity>
  );
}
