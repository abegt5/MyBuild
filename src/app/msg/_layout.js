import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // You can use Ionicons or any other icon library
import { useRouter } from "expo-router"; // Import useRouter to handle navigation

export default function MessagesLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true, // Ensures the header is shown
        headerLeft: () => (
          // Custom back button
          <TouchableOpacity
            onPress={() => router.back()} // Go back to the previous screen
            style={{ marginLeft: 10 }} // Adjust spacing from the left edge
          >
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
        ),
      }}
    />
  );
}
