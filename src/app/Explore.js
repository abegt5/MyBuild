import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { useRouter, useSegments } from "expo-router";

export default function Explore() {
  const router = useRouter();
  const segments = useSegments();

  // We can use this to conditionally render Feed/Explore titles
  const isExplore = segments.includes("Explore");
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
      <Text>Explore Content Here</Text>
      <TouchableOpacity
                    onPress={() =>
                      router.push(isExplore ? "/Feed" : "/feed/Explore")
                    }
                    style={{ marginLeft: 10 }}
                  >
                    <Text style={{ color: "#69AFF5", fontSize: 16 }}>
                      {isExplore ? "Feed" : "Explore"}
                    </Text>
                  </TouchableOpacity>
    </View>
  );
}
