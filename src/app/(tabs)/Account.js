import React from 'react';
import { signOut } from 'firebase/auth';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { auth } from '../../Firebase';

export default function AccountScreen() {
  const route = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      route.push('SignUp');  // Redirect to the login screen after sign out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text>Account Screen</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={{ color: 'blue' }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
