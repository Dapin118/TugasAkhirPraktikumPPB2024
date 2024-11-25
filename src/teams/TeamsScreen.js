import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './TeamsScreenStyle'; // Import styles dari TeamsScreenStyle.js
import { fetchTeams } from '../../api/MotoGPRidersApi'; // Import API fetchTeams

const TeamsScreen = () => {
  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [activeCategory, setActiveCategory] = useState('MotoGP'); // Default ke MotoGP

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchTeams(); // Ambil data tim
        setTeams(data);
        setFilteredTeams(data.filter((team) => team.category === 'MotoGP')); // Default filter MotoGP
      } catch (error) {
        console.error('Error loading teams:', error);
      }
    };

    loadTeams();
  }, []);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setFilteredTeams(teams.filter((team) => team.category === category));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teams</Text>
      {/* Kategori Tab */}
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
      {/* FlatList untuk Tim */}
      <FlatList
        data={filteredTeams}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Gambar Tim */}
            <Image source={{ uri: item.picture }} style={styles.teamImage} />
            {/* Informasi Tim */}
            <View style={styles.info}>
              <Text style={styles.teamName}>{item.name}</Text>
              {item.riders.map((rider, index) => (
                <Text key={index} style={styles.riderName}>
                  {rider}
                </Text>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default TeamsScreen;
