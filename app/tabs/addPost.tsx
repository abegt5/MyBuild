import { View, Text, Button, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function AddPostScreen() {
    const router = useRouter();
    const [postText, setPostText] = useState("");

    const handlePost = () => {
        // Logic to save post
        console.log("Post Text:", postText);
        router.push("/tabs/home"); // Redirect to Home screen
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Create a New Post</Text>
            <TextInput
                value={postText}
                onChangeText={setPostText}
                placeholder="What's on your mind?"
                style={{
                    height: 100,
                    borderColor: "#ccc",
                    borderWidth: 1,
                    marginBottom: 20,
                    padding: 10,
                }}
            />
            <Button title="Post" onPress={handlePost} />
        </View>
    );
}
