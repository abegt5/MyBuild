import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import posts from "../../../assets/data/posts.json";
import { useRouter } from "expo-router";
import { auth, db } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// TODO: show mod should change based on car currently selected.
// animate the change from plus to check

const AddModForm = ({ mods, setMods }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      setMods([...mods, input.trim()]);
      setInput("");
    }
  };

  return (
    <View className="flex-row items-center mt-6">
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Enter mod"
        placeholderTextColor="#999"
        className="flex-1 border border-gray-300 rounded px-3 py-2 mr-2 text-white"
      />
      <TouchableOpacity
        onPress={handleAdd}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        <Text className="text-white font-bold">Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProfileScreen = () => {
  const route = useRouter();
  const [showMods, setShowMods] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isEditingMods, setIsEditingMods] = useState(false);
  const [mods, setMods] = useState([
    "Cold Air Intake",
    "Custom Exhaust",
    "Lowering Springs",
  ]);
  const [isFollowing, setIsFollowing] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      route.push("SignUp");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleEditMods = () => {
    setIsEditingMods(!isEditingMods);
    setShowMods(true); // Make sure mods list is visible when editing
    setDropdownVisible(false); // Close dropdown
  };

  const handleDeletePosts = () => {
    console.log("Delete posts clicked");
  };

  const handleFollow = () => {
    console.log("Follow clicked");
    setIsFollowing(!isFollowing);
  };
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setUsername(null);
          setLoading(false);
          return;
        }

        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setUsername(data.username || null);
        } else {
          setUsername(null);
        }
      } catch (error) {
        console.error("Error fetching username:", error);
        setUsername(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUsername();
  }, []);
  [];

  return (
    <SafeAreaView className="flex-1 bg-black">
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss(); //dismiss keyboard too
          if (dropdownVisible) {
            setDropdownVisible(false);
            setIsEditingMods(false);
          }
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingTop: 16,
              paddingHorizontal: 8,
            }}
            keyboardShouldPersistTaps="handled"
            className="bg-black"
          >
            {/* Header with Dropdown */}
            <View className="flex-row justify-between items-center mb-2">
              {username ? (
                <Text className="color-secondary text-xl font-bold">
                  {username}
                </Text>
              ) : (
                <Text>...</Text>
              )}

              <View>
                <TouchableOpacity
                  onPress={() => setDropdownVisible(!dropdownVisible)}
                >
                  <Text className="text-[#E55733] font-bold text-4xl">⋮</Text>
                </TouchableOpacity>

                {dropdownVisible && (
                  <View className="absolute right-0 mt-2 w-40 bg-white rounded shadow z-10">
                    <TouchableOpacity
                      onPress={handleLogout}
                      className="px-4 py-2 border-b border-gray-200"
                    >
                      <Text className="text-red-500 font-medium">Sign Out</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleEditMods}
                      className="px-4 py-2 border-b border-gray-200"
                    >
                      <Text className="text-gray-800 font-medium">
                        Edit Mods List
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleDeletePosts}
                      className="px-4 py-2"
                    >
                      <Text className="text-gray-800 font-medium">
                        Delete Posts
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>

            {/* Profile Section */}
            <View className="flex-row items-center mb-2">
              <Image
                source={{
                  uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg",
                }}
                className="w-[80px] h-[80px] rounded-full mr-4"
              />
              <View className="flex-1">
                <View className="flex-row justify-between">
                  <View className="items-center">
                    <Text className="text-secondary font-bold text-xl">42</Text>
                    <Text className="text-gray-500 text-sm ">Posts</Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-secondary font-bold text-xl">
                      1.2k
                    </Text>
                    <Text className="text-gray-500 text-sm">Followers</Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-secondary font-bold text-xl">
                      350
                    </Text>
                    <Text className="text-gray-500 text-sm">Following</Text>
                  </View>
                </View>

                <View className="flex-row mt-2">
                  <TouchableOpacity
                    className="bg-blue-500 px-8 py-3  ml-9 mr-9"
                    style={{
                      borderRadius: 15,
                      alignSelf: "center",
                      marginBottom: 16,
                    }}
                    onPress={handleFollow}
                  >
                    {isFollowing ? (
                      <FontAwesome5 name="check" size={20} color="white" />
                    ) : (
                      <FontAwesome5 name="plus" size={20} color="white" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="border border-gray-400 px-8 py-3"
                    style={{
                      borderRadius: 15,
                      alignSelf: "center",
                      marginBottom: 16,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="message-outline"
                      size={20}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Mods Button */}
            <TouchableOpacity
              onPress={() => setShowMods(!showMods)}
              className="items-center justify-center"
              style={{
                backgroundColor: "#E55733",
                borderRadius: 15,
                width: 300,
                height: 45,
                alignSelf: "center",
                marginBottom: 16,
              }}
            >
              <Text className="text-white font-bold text-xl">
                {showMods ? "Hide Mods" : "Show Mods"}
              </Text>
            </TouchableOpacity>

            {/* Mods List */}
            {showMods && (
              <View className="mb-4">
                {mods.map((mod, idx) => (
                  <View key={idx} className="flex-row items-center mb-2">
                    {isEditingMods ? (
                      <>
                        <Text className="text-gray-700 text-base flex-1">
                          • {mod}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            const updated = [...mods];
                            updated.splice(idx, 1);
                            setMods(updated);
                          }}
                        >
                          <Text className="text-red-500 text-sm ml-2">
                            Remove
                          </Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <Text className="text-white text-base">• {mod}</Text>
                    )}
                  </View>
                ))}

                {/* Show input + Add button when editing */}
                {isEditingMods && <AddModForm mods={mods} setMods={setMods} />}
              </View>
            )}

            {/* Posts */}
            <View className="mb-10 items-center">
              <Text className="font-bold text-lg mb-2 text-secondary">
                Posts
              </Text>
              <View className="flex-row flex-wrap gap-2 justify-between">
                {posts.map((post, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => route.push("/Feed")}
                    className="w-[48%] mb-2"
                  >
                    <Image
                      source={{ uri: post.image_url }}
                      className="h-40 rounded"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ProfileScreen;
