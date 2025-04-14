import { Stack } from "expo-router";
import "../global.css";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
      <Stack screenOptions={{ headerShown: false }}>
        {/* This disables header from the root layout */}
        <StatusBar style="dark" hiddenclea={false} />
      </Stack>
  );
}
