import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

export default function PostListItem({ post }) {
  // distruct post prop paqssed in
  const [expanded, setExpanded] = useState(false); // State to track if the caption is expanded
  return (
    <View className="">
      {/*Header*/}
      <View className="p-2 flex-row items-center gap-2 border-t border-b-hairline border-gray-200 bg-white " >
        <Image
          source={{ uri: post.user.image_url }}
          className="w-12 aspect-square rounded-full"
        />
        <Text className="font-bold color-black">{post.user.username}</Text>

        <Feather name="bookmark" size={24} className="ml-auto" />
      </View>

      <Image source={{ uri: post.image_url }} className="w-full aspect-[4/3]" />
      {/* Post Icons */}
      <View className="items-center mt-1">
        <View className="flex-row gap-7 px-7 py-1 bg-black/30 rounded-full">
          <AntDesign name="hearto" size={24} color="white" />
          <Ionicons name="chatbubble-outline" size={24} color="white" />
          <Feather name="send" size={24} color="white" />
        </View>
      </View>
      {/* Post Caption */}
      <View className="px-4 py-2">
        <Text
          className="text-black"
          numberOfLines={expanded ? undefined : 2} // If expanded, no limit; otherwise, limit to 3 lines
        >
          {post.caption}
        </Text>

        {/* "View More" button */}
        {post.caption.length > 100 && ( // You can adjust the length based on the length of the caption
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text className="text-black text-center mt-2">
              {expanded ? "View Less" : "View More"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
