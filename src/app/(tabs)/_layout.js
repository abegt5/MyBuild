import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function TabsLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#000", // black background
          position: "absolute", // ensures tab bar stays at the bottom
          bottom: 10, // align to the bottom of the screen
          borderRadius: 20,
          borderCurve: "continuous",
          height: 60, // Fixed height for consistency
          width: "90%",
          marginHorizontal: "5%", // Centers the tab bar with 5% margin on each side
          elevation: 0, // Remove Android shadow
          shadowOpacity: 0, // Remove shadow opacity
          shadowOffset: { width: 0, height: 0 }, // Remove shadow offset
          shadowRadius: 0, // Remove shadow radius
        },
        tabBarActiveTintColor: "#69AFF5", // Set the active tab color
        tabBarInactiveTintColor: "#888", // Set the inactive tab color
        tabBarLabelStyle: {
          fontSize: 12,
          textAlign: "center",
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="Feed"
        options={{
          title: "Explore Feed",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/messages/Messages")}
              style={{ marginRight: 10 }}
            >
              <MaterialCommunityIcons
                name="message-outline"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="car-sport-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AddPost"
        options={{
          title: "Add Post",
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Events"
        options={{
          title: "Events",
          tabBarIcon: ({ color }) => (
            <Ionicons name="location-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
