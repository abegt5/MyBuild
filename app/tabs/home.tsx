import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>📰 Home Feed</Text>
            <Button title="Go to Add Post" onPress={() => router.push("/addPost")} />
        </View>
    );
}
