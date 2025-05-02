import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import EventCard from "../../components/EventCard"; // Import your EventCard component

const events = [
  {
    date: "2025-05-15T18:30:00Z",
    location: "Central Park, NY",
    backgroundImage: "https://example.com/event-background-1.jpg",
  },
  {
    date: "2025-06-10T14:00:00Z",
    location: "Brooklyn Bridge Park, NY",
    backgroundImage: "https://example.com/event-background-2.jpg",
  },
  // Add more events as needed
];

export default function EventsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upcoming Events</Text>

      <ScrollView style={styles.scrollContainer}>
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  scrollContainer: {
    flex: 1,
  },
});
