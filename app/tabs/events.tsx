import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function EventsScreen() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>📅 Upcoming Events</Text>
            <Button title="Go to Account" onPress={() => router.push("/tabs/account")} />
        </View>
    );
}
