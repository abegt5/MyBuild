import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { format } from "date-fns"; // To format date (optional, for convenience)

const EventCard = ({ event }) => {
  const [isJoined, setIsJoined] = useState(false); // Track if the user joined the event

  // Format the date in MM/DD/YYYY HH:mm
  const formattedDate = format(new Date(event.date), "MM/dd/yyyy HH:mm");

  return (
    <ImageBackground
      source={{ uri: event.backgroundImage }} // Event background image URL
      style={{
        width: "100%",
        height: 200,
        justifyContent: "flex-end",
        position: "relative",
      }}
    >
      {/* Transparent card on the bottom half */}
      <View className="absolute bottom-0 w-full h-1/2 bg-black bg-opacity-50 p-4 flex-row items-center justify-between">
        {/* Left side (Date and Location) */}
        <View>
          <Text className="text-white text-lg font-bold">{formattedDate}</Text>
          <Text className="text-white text-sm">{event.location}</Text>
        </View>

        {/* Right side (Join Button) */}
        <TouchableOpacity
          onPress={() => setIsJoined(!isJoined)} // Toggle join status
          style={{
            backgroundColor: isJoined ? "#4CAF50" : "#2196F3", // Green if joined, blue if not
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text className="text-white font-semibold">
            {isJoined ? "Joined" : "Join"}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default EventCard;
