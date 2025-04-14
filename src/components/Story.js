import { View, Text, Image, TouchableOpacity } from "react-native";

export default function StoryListItem({ story, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="items-start ">
        {/* Story Image */}
        <Image
          source={{ uri: story.image_url }}
          className="w-20 h-24 rounded-md border-0 border-blue-500"
        />
        <Text className="text-secondary mt-1 text-xs">{story.user.username}</Text>
      </View>
    </TouchableOpacity>
  );
}
