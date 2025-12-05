// TODO: Add a "forgot password" feature
// TODO: translte auth error messages and add to ui. let user see missing requirmetns for password.
// show missing requirments for password as a list

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
import { db as firestore } from "../Firebase";

export default function AuthScreen() {
  const [tab, setTab] = useState<"signUp" | "logIn">("signUp");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    /*  const authErrorMessages = {
      "auth/admin-restricted-operation":
        "This operation is restricted to administrators.",
      "auth/argument-error": "An unexpected error occurred. Please try again.",
      "auth/app-not-authorized":
        "This app is not authorized to use Firebase Authentication.",
      "auth/app-not-installed":
        "Please install the required authentication app and try again.",
      "auth/captcha-check-failed":
        "CAPTCHA verification failed. Please try again.",
      "auth/code-expired": "The code has expired. Please request a new one.",
      "auth/email-already-in-use": "This email address is already registered.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/wrong-password": "Incorrect password. Please try again.",
      "auth/user-not-found": "No account found with that email address.",
      "auth/user-disabled": "This account has been disabled.",
      "auth/weak-password":
        "Your password is too weak. Please choose a stronger one.",
      "auth/network-request-failed":
        "Network error. Check your internet connection.",
      "auth/too-many-requests":
        "Too many attempts. Please wait a moment and try again.",
      "auth/invalid-verification-code":
        "Invalid verification code. Please try again.",
      "auth/missing-verification-code": "Please enter the verification code.",
      "auth/invalid-credential": "Invalid credentials. Please try again.",
      "auth/operation-not-allowed":
        "This sign-in method is not enabled. Contact support.",
      "auth/popup-closed-by-user":
        "Sign-in popup closed before completing the process.",
      "auth/timeout": "Request timed out. Please try again.",
    }; */

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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
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
      //setError(friendlyMessage);
    }
  };

  const handleLogIn = async () => {
    const authErrorMessages = (code: string) => {
      switch (code) {
        case "auth/admin-restricted-operation":
          return "This operation is restricted to administrators.";
        case "auth/argument-error":
          return "An unexpected error occurred. Please try again.";
        case "auth/app-not-authorized":
          return "This app is not authorized to use Firebase Authentication.";
        case "auth/app-not-installed":
          return "Please install the required authentication app and try again.";
        case "auth/captcha-check-failed":
          return "CAPTCHA verification failed. Please try again.";
        case "auth/code-expired":
          return "The code has expired. Please request a new one.";
        case "auth/email-already-in-use":
          return "This email address is already registered.";
        case "auth/invalid-email":
          return "Please enter a valid email address.";
        case "auth/wrong-password":
          return "Incorrect password. Please try again.";
        case "auth/user-not-found":
          return "No account found with that email address.";
        case "auth/user-disabled":
          return "This account has been disabled.";
        case "auth/weak-password":
          return "Your password is too weak. Please choose a stronger one.";
        case "auth/network-request-failed":
          return "Network error. Check your internet connection.";
        case "auth/too-many-requests":
          return "Too many attempts. Please wait a moment and try again.";
        case "auth/invalid-verification-code":
          return "Invalid verification code. Please try again.";
        case "auth/missing-verification-code":
          return "Please enter the verification code.";
        case "auth/invalid-credential":
          return "Invalid credentials. Please try again.";
        case "auth/operation-not-allowed":
          return "This sign-in method is not enabled. Contact support.";
        case "auth/popup-closed-by-user":
          return "Sign-in popup closed before completing the process.";
        case "auth/timeout":
          return "Request timed out. Please try again.";
      }
    };
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/Feed");
    } catch (err: any) {
      const friendlyMessage =
        authErrorMessages(err.code || err.message) || "An error occurred.";
      //console.error(friendlyMessage);
      setError(friendlyMessage);
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
