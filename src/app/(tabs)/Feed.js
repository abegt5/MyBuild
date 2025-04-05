import { View, Text, Image, FlatList } from "react-native";
import posts from "../../../assets/data/posts.json";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import PostListItem from "../../components/PostListItem.js";

export default function FeedScreen() {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
    />
  );
}
