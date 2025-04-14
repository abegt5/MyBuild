// /app/index.js or /app/layout.js
import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { auth } from '../Firebase'; // Assuming you've already set up Firebase Auth
import { onAuthStateChanged } from 'firebase/auth';
import { ActivityIndicator } from 'react-native';

export default function RedirectToHome() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Check if the user is logged in

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  // If user is logged in, set user state
      setLoading(false);    // Set loading to false
    });

    return () => unsubscribe();  // Cleanup on unmount
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // If the user is logged in, redirect them to the tabs
  if (user) {
    return <Redirect href="/(tabs)/Feed" />;
  }

  // If the user isn't logged in, show the login page
  return <Redirect href="/SignUp" />;
}
