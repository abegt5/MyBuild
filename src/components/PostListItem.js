import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";

export default function PostListItem({ post }) {
  // destruct post prop passed in
  const [expanded, setExpanded] = useState(false); // State to track if the caption is expanded
  const handleLike = () => {
    // Handle the like action here
    console.log("Post liked!");
  };
  const handleComment = () => {
    // Handle the comment action here
    console.log("comment here!");
  };
  const handleShare = () => {
    // Handle the share action here
    console.log("Post shared!");
  };
  const handleBookmark = () => {
    // Handle the bookmark action here
    console.log("Post bookmarked!");
  }
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'; // Format the number as '1.2K', for example
    }
    return num;
  };
  return (
    <View className=" bg-primary shadow-md">
      {/*Header*/}
      <View className="p-2 flex-row items-center gap-2 shadow-md bg-primary "  >
        {/* Profile Picture */}
        <Image
          source={{ uri: post.user.image_url }}
          className="w-12 aspect-square rounded-full"
        />
        {/* UserName */}
        <Text className="font-bold text-secondary" >{post.user.username}</Text>

        {/*bookmark icon*/}
        <TouchableOpacity onPress={handleBookmark} className="ml-auto">
        <Feather name="bookmark" size={24} color= "white"  />
        </TouchableOpacity>
  
      </View>

      <View className="relative mb-3">
  {/* Post Image */}
  <Image
    source={{ uri: post.image_url }}
    className="w-full aspect-[4/3] rounded-xl"
  />

  {/* Post Icons */}
  <View className="absolute bottom-0 left-0 right-0 p-1 flex-row gap-4 bg-transparent justify-center "> 
    
    <TouchableOpacity onPress={handleLike} className="flex-row gap-1.5">
      <AntDesign name="hearto" size={24} color="white" />
      {/* Post stats */}
      {post.stats.likes > 0 && (
        <Text className="text-secondary self-center">{formatNumber(post.stats.likes)}</Text>
      )}
    </TouchableOpacity>

    <TouchableOpacity onPress={handleComment} className="flex-row gap-1.5">
    <Ionicons name="chatbubble-outline" size={24} color="white" />
    {post.stats.comments > 0 && (
        <Text className="text-secondary self-center">{formatNumber(post.stats.comments)}</Text>
      )}
    </TouchableOpacity>

    <TouchableOpacity onPress={handleShare} className="flex-row gap-1.5">
    <Feather name="send" size={24} color="white" />
    {post.stats.shares > 0 && (
        <Text className="text-secondary self-center">{formatNumber(post.stats.shares)}</Text>
      )}
    </TouchableOpacity>
  </View>
</View>
     

      {/* Post Caption */}
      <View className="px-2.5 py-2 bg-primary rounded-2xl mb-2">
      <Text className="text-secondary font-bold text-center">
          {post.user.username}
        </Text>
        {/* Caption text */}
        <Text
          className="text-secondary/70 text-md text-justify"
          numberOfLines={expanded ? undefined : 2} // If expanded, no limit; otherwise, limit to 2 lines
        >

          {post.caption}
        </Text>

        {/* "View More" button */}
        {post.caption.length > 100 && ( 
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text className="text-gray-700 text-center mt-2">
              {expanded ? "View Less" : "View More"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      </View>
  );
}
