import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { fetchSeasonsData } from '../../api/MotoGPSeasonsApi';
import styles from './SeasonsScreenStyle';

const SeasonsScreen = ({ navigation }) => {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchSeasonsData();
        setSeasons(data || []);
      } catch (error) {
        console.error('Error loading seasons data', error);
      }
    };

    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MotoGP Seasons</Text>
      <FlatList
        data={seasons}
        keyExtractor={(item) => item.year.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Events', { seasonYear: item.year })} // Navigasi ke EventsScreen
          >
            <Text>Year: {item.year}</Text>
            <Text>Current Season: {item.current ? 'Yes' : 'No'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SeasonsScreen;
