import { Stack } from "expo-router";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* This disables header from the root layout */}
        <StatusBar style="dark" hiddenclea={false} />
      </Stack>
    </GestureHandlerRootView>
  );
}
