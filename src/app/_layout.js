import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
      <Stack screenOptions={{ headerShown: false }}>
        {/* This disables header from the root layout */}
      </Stack>
  );
}
