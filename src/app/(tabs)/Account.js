import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { View, Text, Image, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import posts from "../../../assets/data/posts.json";
import { useRouter } from "expo-router";
import { auth } from '../../Firebase';
import { TextInput } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";




const AddModForm = ({ mods, setMods }) => {
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      setMods([...mods, input.trim()]);
      setInput('');
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
      <TouchableOpacity onPress={handleAdd} className="bg-blue-500 px-4 py-2 rounded">
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
    'Cold Air Intake',
    'Custom Exhaust',
    'Lowering Springs',
  ]);
  

  const handleLogout = async () => {
    try {
      await signOut(auth);
      route.push('SignUp');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleEditMods = () => {
    setIsEditingMods(!isEditingMods);
    setShowMods(true); // Make sure mods list is visible when editing
    setDropdownVisible(false); // Close dropdown
  };
  

  const handleDeletePosts = () => {
    console.log('Delete posts clicked');
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
    <Pressable
      style={{ flex: 1 }}
      onPress={() => dropdownVisible && setDropdownVisible(false)} // Close dropdown on outside press
    >
      <ScrollView className="flex-1 bg-black px-2 pt-4">
        {/* Header with Dropdown */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="color-secondary text-xl font-bold">abe</Text>

          <View>
            <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
              <Text className="text-[#E55733] font-bold text-4xl">⋮</Text>
            </TouchableOpacity>

            {dropdownVisible && (
              <View className="absolute right-0 mt-2 w-40 bg-white rounded shadow z-10">
                <TouchableOpacity onPress={handleLogout} className="px-4 py-2 border-b border-gray-200">
                  <Text className="text-red-500 font-medium">Sign Out</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEditMods} className="px-4 py-2 border-b border-gray-200">
                  <Text className="text-gray-800 font-medium">Edit Mods List</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeletePosts} className="px-4 py-2">
                  <Text className="text-gray-800 font-medium">Delete Posts</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Profile Section */}
        <View className="flex-row items-center mb-4">
          <Image
            source={{ uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg" }}
            className="w-[100px] h-[100px] rounded-full mr-4"
          />
          <View className="flex-1">
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text className="text-secondary font-bold text-xl">42</Text>
                <Text className="text-gray-500 text-sm ">Posts</Text>
              </View>
              <View className="items-center">
                <Text className="text-secondary font-bold text-xl">1.2k</Text>
                <Text className="text-gray-500 text-sm">Followers</Text>
              </View>
              <View className="items-center">
                <Text className="text-secondary font-bold text-xl">350</Text>
                <Text className="text-gray-500 text-sm">Following</Text>
              </View>
            </View>

            <View className="flex-row mt-2">
              <TouchableOpacity className="bg-blue-500 px-8 py-3  ml-9 mr-4" 
              style={{
            borderRadius: 15,
            alignSelf: 'center',
            marginBottom: 16,
                }}>
                <Text className="text-white font-semibold">Add</Text>
              </TouchableOpacity>
              <TouchableOpacity className="border border-gray-400 px-8 py-3"
                style={{
                  borderRadius: 15,
                  alignSelf: 'center',
                  marginBottom: 16,
                }}
              >
                <Text className="text-secondary font-semibold">Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Mods Button */}
        <TouchableOpacity
          onPress={() => setShowMods(!showMods)}
          className="items-center justify-center"
          style={{
            backgroundColor: '#E55733',
            borderRadius: 15,
            width: 300,
            height: 45,
            alignSelf: 'center',
            marginBottom: 16,
          }}
        >
          <Text className="text-white font-bold text-xl">
            {showMods ? 'Hide Mods' : 'Show Mods'}
          </Text>
        </TouchableOpacity>

        {/* Mods List */}
        {showMods && (
  <View className="mb-4">
    {mods.map((mod, idx) => (
      <View key={idx} className="flex-row items-center mb-2">
        {isEditingMods ? (
          <>
            <Text className="text-gray-700 text-base flex-1">• {mod}</Text>
            <TouchableOpacity onPress={() => {
              const updated = [...mods];
              updated.splice(idx, 1);
              setMods(updated);
            }}>
              <Text className="text-red-500 text-sm ml-2">Remove</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text className="text-gray-700 text-base">• {mod}</Text>
        )}
      </View>
    ))}

    {/* Show input + Add button when editing */}
    {isEditingMods && (
      <AddModForm mods={mods} setMods={setMods} />
    )}
  </View>
)}

        {/* Posts */}
        <View className="mb-10 items-center">
  <Text className="font-bold text-lg mb-2 text-secondary">Posts</Text>
  <View className="flex-row flex-wrap gap-2 justify-between">
    {posts.map((post, idx) => (
      <Image
        key={idx}
        source={{ uri: post.image_url }}
        className="w-[48%] h-40 rounded mb-2"
        resizeMode="cover"
      />
    ))}
  </View>
</View>
      </ScrollView>
    </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;
