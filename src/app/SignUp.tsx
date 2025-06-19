
// TODO: Add a "forgot password" feature
// TODO: translte auth error messages and add to ui. let user see missing requirmetns for password.
// the error message given by the password comes in a list like needs 6 char or upper case and such so build a ui to show which is still missing 


import React, { useState } from "react";
import { View } from "react-native";
import { auth } from "../Firebase"; // make sure this path is correct
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { router } from "expo-router";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Text } from "~/components/ui/text";
import { doc, serverTimestamp, getDoc, writeBatch } from "firebase/firestore";
import { db as firestore } from '../Firebase';

export default function AuthScreen() {
  const [tab, setTab] = useState<"signUp" | "logIn">("signUp");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const getFriendlyErrorMessage = (code: string) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "That email is already registered. Try logging in.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/user-not-found":
        return "No account found with that email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/missing-password":
        return "Please enter your password.";
      case "auth/invalid-password":
        return "The password is invalid or does not meet the password requirements.";
      default:
        return "Something went wrong. Please try again later.";
    }
  };

const handleSignUp = async () => {
  if (!username.trim()) {
    setError("Please enter a username.");
    return;
  }

  try {
    // 1. Check if username is already taken
    const usernameRef = doc(firestore, "usernames", username);
    const usernameSnap = await getDoc(usernameRef);

    if (usernameSnap.exists()) {
      setError("Username already taken.");
      return;
    }

    // 2. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // 3. Save username + user info in Firestore using a batch write
    const userRef = doc(firestore, "users", uid);
    const batch = writeBatch(firestore);
    batch.set(userRef, {
      username,
      email,
      createdAt: serverTimestamp(),
    });
    batch.set(usernameRef, { uid });

    await batch.commit();

    // 4. Redirect to feed
    router.push("/Feed");
  } catch (err: any) {
    console.log("🔥 Firebase Auth Error:", err.code, err.message); //line for debugging
    const friendly = getFriendlyErrorMessage(err.code || err.message);
    setError(friendly);

  }
};


  const handleLogIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/Feed");
    } catch (err: any) {
      const friendly = getFriendlyErrorMessage(err.code || err.message);
      setError(friendly);
    }
  };

  return (
    <View className="flex-1 bg-black">
      {/* add something above signup form like a logo and message */}

      <View className="flex-1 justify-center p-6 bg-white">
        <Tabs
          value={tab}
          onValueChange={(val: string) => setTab(val as "signUp" | "logIn")}
          className="w-full max-w-[400px] mx-auto"
        >
          <TabsList className="flex-row w-full mb-4 bg-gray-100 rounded-lg p-1">
            <TabsTrigger
              value="signUp"
              className={`flex-1 py-2 rounded-md ${
                tab === "signUp" ? "bg-[#4C89D9]" : "bg-transparent"
              }`}
            >
              <Text
                className={
                  tab === "signUp" ? "text-white font-bold" : "text-black"
                }
              >
                Sign Up
              </Text>
            </TabsTrigger>
            <TabsTrigger
              value="logIn"
              className={`flex-1 py-2 rounded-md ${
                tab === "logIn" ? "bg-[#4C89D9]" : "bg-transparent"
              }`}
            >
              <Text
                className={
                  tab === "logIn" ? "text-white font-bold" : "text-black"
                }
              >
                Log In
              </Text>
            </TabsTrigger>
          </TabsList>

          {/* --- Sign Up Tab --- */}
          <TabsContent value="signUp">
            <Card>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>
                  Register with your email and a password.
                </CardDescription>
              </CardHeader>
              <CardContent className="gap-4 native:gap-2">
                <View className="gap-1">
                  <Label nativeID="username">Username</Label>
                  <Input // check to make sure username is unique
                    id="username"
                    placeholder="Your username"
                    value={username}
                    onChangeText={setUsername} // username is not unique chekecked change that
                  />
                </View>
                <View className="gap-1">
                  <Label nativeID="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="your@email.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                <View className="gap-1">
                  <Label nativeID="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="********"
                    value={password}
                    onChangeText={setPassword} // firebase handles checking password for requiremnts 
                    secureTextEntry
                  />
                </View>
                {error ? (
                  <Text className="text-red-500 mt-2">{error}</Text>
                ) : null}
              </CardContent>
              <CardFooter>
                <Button onPress={handleSignUp} className="bg-[#4C89D9]">
                  <Text className="text-white">Sign Up</Text>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* --- Log In Tab --- */}
          <TabsContent value="logIn">
            <Card>
              <CardHeader>
                <CardTitle>Log In</CardTitle>
                <CardDescription>
                  Access your account using email and password.
                </CardDescription>
              </CardHeader>
              <CardContent className="gap-4 native:gap-2">
                <View className="gap-1">
                  <Label nativeID="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="your@email.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                <View className="gap-1">
                  <Label nativeID="password">Password</Label>
                  <Input
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
                {error ? (
                  <Text className="text-red-500 mt-2">{error}</Text>
                ) : null}
              </CardContent>
              <CardFooter>
                <Button onPress={handleLogIn} className="bg-[#4C89D9]">
                  <Text className="text-white">Log In</Text>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </View>
    </View>
  );
}