import React, { useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { format } from "date-fns";

const EventCard = ({ event }) => {
  const [isJoined, setIsJoined] = useState(false);
  const formattedDate = format(new Date(event.date), "MM/dd/yyyy HH:mm");

  return (
    <View className="mb-4 shadow-md rounded-xl overflow-hidden">
      <ImageBackground
        source={{ uri: event.backgroundImage }}
        className="w-full h-52 justify-end"
        imageStyle={{ borderRadius: 12 }} // applies to the image inside the background
      >
        <View className="bg-white bg-opacity-50 p-3 flex-row items-center justify-between">
          <View>
            <Text className="text-black text-lg font-bold">{formattedDate}</Text>
            <Text className="text-black text-sm">{event.location}</Text>
          </View>

          <TouchableOpacity
            onPress={() => setIsJoined(!isJoined)}
            className={`px-4 py-2 rounded-full ${
              isJoined ? "bg-green-600" : "bg-blue-600"
            }`}
          >
            <Text className="text-white font-semibold">
              {isJoined ? "Joined" : "Join"}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default EventCard;
