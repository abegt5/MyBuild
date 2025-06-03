import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { TouchableOpacity, Text, View } from "react-native";
import { useRouter, useSegments } from "expo-router";
import { ExploreFilterProvider } from '../../context/ExploreFilterContext';
import { useExploreFilter } from '../../context/ExploreFilterContext';
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"

export default function TabsLayout() {
  const segments = useSegments();

  // We can use this to conditionally render Feed/Explore titles
  const isExplore = segments.includes("Explore");

  const handleAddEvent = () => {
    console.log("Add Event pressed");
    // Navigate or open modal
  };
  function ExploreHeaderToggle() {
  const { friendsOnly, setFriendsOnly } = useExploreFilter();

  return (
    <View className="flex-row justify-around items-center bg-white/15 rounded-2xl px-1 py-1">

      <TouchableOpacity onPress={() => setFriendsOnly(false)} className="items-center mx-1">
        <FontAwesome5
          name="globe"
          size={24}
          color={!friendsOnly ? "#4C89D9" : "black"}
        />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => setFriendsOnly(true)} className="items-center mx-1">
        <FontAwesome5
          name="user-friends"
          size={24}
          color={friendsOnly ? "#4C89D9" : "black"}
        />
      </TouchableOpacity>
    </View>
  );
}
  const router = useRouter();
  return (
        <ExploreFilterProvider>
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "black", // black background
          position: "absolute", // ensures tab bar stays at the bottom
          bottom: 17, // align to the bottom of the screen
          flexDirection: "row", // horizontal layout
          justifyContent: "space-between", // space between items
          marginHorizontal: "5%", // horizontal margin
          paddingVertical: 15, // vertical padding
          borderRadius: 25,
          borderCurve: "continuous",
          height: "8%", // Fixed height for consistency
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
        // Customize header for each screen
        headerStyle: {
          backgroundColor: "black", // Set background color for the header
          elevation: 0, // Remove shadow for iOS
          shadowOpacity: 0, // Remove shadow
        },
        headerTitleStyle: {
          color: "#fff", // White text color
          fontSize: 18, // Set font size
          fontWeight: "bold", // Set font weight to bold
          fontFamily: "sans-serif", // Set font family
        },
      }}
    >
      <Tabs.Screen
        name="Feed"
        options={{
          headerShown: false,
          title: "Garage",
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
              name="Explore"
              options={{
                title: "Explore",
                tabBarStyle: { display: 'none' },
                headerShown: false,
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="go-kart-track" size={24} color={color} />
                ),
                headerRight: () => (
                  <TouchableOpacity
                          onPress={() => router.push('/Feed')}
                          style={{ marginRight: 0 }}
                        >
                          <Text className= "text-blue-400 text-xl font-bold justify-around items-center bg-white/15 rounded-2xl px-2 py-1">
                            Garage
                          </Text>
                        </TouchableOpacity>
          ),
          headerLeft: () => <ExploreHeaderToggle />,
              }}
            />

      <Tabs.Screen
        name="Events"
        options={{
          title: "Events",
          headerRight: () => (
            <TouchableOpacity onPress={handleAddEvent}
            style={{ marginRight: 10 }}>
          <Ionicons name="add-circle-outline" size={37} color="white" />
        </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="location-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          title: "Account",
          headerShown: false,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/msg/messages")}
              style={{ marginRight: 10 }}
            >
              <MaterialCommunityIcons
                name="message-outline"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          ),
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
    </ExploreFilterProvider>
  );
}
