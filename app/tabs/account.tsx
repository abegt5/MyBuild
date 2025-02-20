import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function AccountScreen() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>👤 User Profile</Text>
            <Button title="Edit Profile" onPress={() => console.log("Edit Profile")} />
        </View>
    );
}
