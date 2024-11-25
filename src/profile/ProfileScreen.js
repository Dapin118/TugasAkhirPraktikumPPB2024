import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './ProfileScreenStyle'; // Import gaya dari file ProfileScreenStyle.js

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Foto Profil */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://media.licdn.com/dms/image/v2/D5603AQEDTYEoeqd4nQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1716108569838?e=1737590400&v=beta&t=qOORcia-PhQ3wxlU71YQEYA58zUMYxjymuICBy6tgxE' }} // URL gambar profil
          style={styles.profileImage}
        />
        <Text style={styles.name}>Davin</Text>
        <Text style={styles.email}>KiwKiw@Gmail.com</Text>
      </View>

      {/* Informasi Detail */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Profile</Text>
        <View style={styles.infoItem}>
          <Ionicons name="person" size={20} color="#4a4a4a" />
          <Text style={styles.infoText}>Username: Bandonts</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="calendar" size={20} color="#4a4a4a" />
          <Text style={styles.infoText}>Joined: January 2020</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="location" size={20} color="#4a4a4a" />
          <Text style={styles.infoText}>Location: Semarang, Indoneisa </Text>
        </View>
      </View>

      {/* Tombol Aksi */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.editButton} onPress={() => alert('Edit Profile Clicked')}>
          <Ionicons name="pencil" size={20} color="#fff" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={() => alert('Logout Clicked')}>
          <Ionicons name="log-out" size={20} color="#fff" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
