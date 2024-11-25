import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchEventsBySeason } from '../../api/MotoGPEventsApi';

const EventsScreen = ({ route }) => {
  const { seasonYear } = route.params; // Ambil tahun dari navigasi
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEventsBySeason(seasonYear);
        setEvents(data || []);
      } catch (error) {
        console.error(`Error loading events for season ${seasonYear}:`, error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [seasonYear]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading events for {seasonYear}...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Events in {seasonYear}</Text>
      {events.length > 0 ? (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Informasi Acara */}
              <Text style={styles.eventName}>{item.name || 'Unknown Event'}</Text>
              <Text style={styles.details}>Circuit: {item.circuit?.name || 'Unknown Circuit'}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noEvents}>No events available for this season.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
  },
  noEvents: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
  },
});

export default EventsScreen;
