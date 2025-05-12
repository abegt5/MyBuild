import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import EventCard from "../../components/EventCard"; // Import your EventCard component

const events = [
  {
    date: "2025-05-15T18:30:00Z",
    location: "Central Park, NY",
    backgroundImage: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg",
  },
  {
    date: "2025-06-10T14:00:00Z",
    location: "Brooklyn Bridge Park, NY",
    backgroundImage: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/2.jpg",
  },
  {
    date: "2025-07-04T16:00:00Z",
    location: "Venice Beach, CA",
    backgroundImage: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/3.jpg",
  },
  {
    date: "2025-08-12T13:00:00Z",
    location: "Seattle Waterfront, WA",
    backgroundImage: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/4.jpg",
  },
  {
    date: "2025-09-01T15:30:00Z",
    location: "Prospect Park, NY",
    backgroundImage: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg",
  },
  {
    date: "2025-10-22T11:00:00Z",
    location: "Empire State Plaza, NY",
    backgroundImage: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/2.jpg",
  },
];


export default function EventsScreen() {
  return (
    <View style={styles.container} className="bg-black">
    
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
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
    paddingTop: 7,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
  },
});
