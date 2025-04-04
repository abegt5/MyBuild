import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#000", // black background
          bottom: 10,
          alignSelf: "center",
          borderRadius: 20,
          height: "10%",
          width: "95%",
        },
        tabBarActiveTintColor: "#fff", // Set the active tab color
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
        name="Home"
        options={{
          title: "Home",
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
