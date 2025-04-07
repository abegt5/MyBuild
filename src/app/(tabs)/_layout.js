import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Dimensions } from "react-native";


const screenWidth = Dimensions.get("window").width;
const tabBarWidth = screenWidth * 0.9;


export default function TabsLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#000", // black background
          position: "absolute", // ensures tab bar stays at the bottom
          bottom: 25, // align to the bottom of the screen
          flexDirection: "row", // horizontal layout
          justifyContent: "space-between", // space between items
          marginHorizontal: "5%", // horizontal margin
          paddingVertical: 15, // vertical padding
          borderRadius: 25,
          borderCurve: "continuous",
          height: "10%", // Fixed height for consistency
          //width: screenWidth * 0.9, // 90% of the screen width

  
          //paddingBottom: 5, // Add some padding at the bottom
          borderTopWidth: 0, // Remove top border
          borderBottomWidth: 0, // Remove bottom border
          borderColor: "transparent", // Remove border color

          elevation: 0, // Remove Android shadow
          shadowOpacity: 0.1, // Remove shadow opacity
          shadowOffset: { width: 0, height: 10 }, // Remove shadow offset
          shadowRadius: 10, // Remove shadow radius
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
          title: "Feed",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/msg/messages")}
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
