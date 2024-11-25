import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { fetchRiders } from '../../api/MotoGPRidersApi'; // Gunakan API fetchRiders
import styles from './RidersScreenStyle'; // Import styles dari RidersScreenStyle.js

const RidersScreen = () => {
  const [riders, setRiders] = useState([]);
  const [filteredRiders, setFilteredRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('MotoGP'); // Default ke MotoGP

  useEffect(() => {
    const loadRiders = async () => {
      try {
        const data = await fetchRiders();
        setRiders(data);
        setFilteredRiders(data.filter((rider) => rider.category === 'MotoGP')); // Default filter MotoGP
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadRiders();
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setFilteredRiders(riders.filter((rider) => rider.category === category));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#cc0000" />
        <Text>Loading Riders...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Riders</Text>
      {/* Tab Kategori */}
      <View style={styles.categoryTab}>
        {['MotoGP', 'Moto2', 'Moto3', 'MotoE'].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              activeCategory === category && styles.activeCategoryButton,
            ]}
            onPress={() => handleCategoryChange(category)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                activeCategory === category && styles.activeCategoryButtonText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* FlatList untuk Pembalap */}
      <FlatList
        data={filteredRiders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Gambar Pembalap */}
            <Image
              source={{ uri: item.portrait }}
              style={styles.portrait}
            />
            {/* Informasi Pembalap */}
            <View style={styles.info}>
              <Text style={styles.name}>
                {item.name} {item.surname}
              </Text>
              <Text style={styles.details}>
                Team: {item.team}
              </Text>
              <Text style={styles.details}>
                Category: {item.category}
              </Text>
              <Text style={styles.details}>
                Birth City: {item.birth_city}
              </Text>
              <Text style={styles.details}>
                Birth Date: {item.birth_date}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default RidersScreen;
