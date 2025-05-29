import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { useState } from "react";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const screenHeight = Dimensions.get("window").height;

export default function PostListItem({ post }) {
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  const handleLike = () => console.log("Like");
  const handleComment = () => console.log("Comment");
  const handleShare = () => console.log("Share");
  const handleBookmark = () => console.log("Bookmark");

  const formatNumber = (num) => num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num;

  return (
    <View className="bg-black flex-1">
      {/* Header */}
      <View className="absolute top-12 left-4 flex-row items-center z-10">
        <Image
          source={{ uri: post.user.image_url }}
          className="w-14 h-14 rounded-full"
        />
        <Text className="text-white font-bold ml-2 text-2xl"> 
          {post.user.username}
        </Text>
      </View>

      {/* Feed Button */}
      <View className="absolute top-14 right-5 z-10">
      <TouchableOpacity
              onPress={() => router.push('/Feed')}
              style={{ marginLeft: 10 }}
            >
              <Text className= "text-blue-400 text-2xl font-bold justify-around items-center bg-white/15 rounded-2xl px-2 py-1">
                Feed
              </Text>
            </TouchableOpacity>
      </View>


      {/* Media */}
      <Image
        source={{ uri: post.image_url }}
        className="w-full h-full"
        resizeMode="cover"
      /> 

      {/* Footer Actions */}
      <View className="absolute bottom-10 w-full px-12 flex-row justify-center items-center">
  <View className="flex-row justify-around items-center bg-white/15 rounded-2xl px-4 py-2">
    <TouchableOpacity onPress={handleLike} className="items-center mx-2">
      <AntDesign name="hearto" size={28} color="white" />
      <Text className="text-white text-xs">{formatNumber(post.stats.likes)}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleComment} className="items-center mx-2">
      <Ionicons name="chatbubble-outline" size={28} color="white" />
      <Text className="text-white text-xs">{formatNumber(post.stats.comments)}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleShare} className="items-center mx-2">
      <Feather name="send" size={28} color="white" />
      <Text className="text-white text-xs">{formatNumber(post.stats.shares)}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={handleBookmark} className="items-center mx-2">
      <Feather name="bookmark" size={28} color="white" />
      <Text className="text-white text-xs">{formatNumber(post.stats.bookmarks)}</Text>
    </TouchableOpacity>
  </View>
</View>

    </View>
  );
}
