import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './RiderCardStyles';

const RiderCard = ({ rider, isSelected, onSelect }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onSelect}>
      <Text style={styles.name}>{rider.rider_name} {rider.rider_surname}</Text>
      <Text style={styles.team}>Team: {rider.team_name}</Text>
      {isSelected && ( // Tampilkan detail hanya jika pembalap dipilih
        <View style={styles.details}>
          <Text>Position: {rider.pos}</Text>
          <Text>Lap Time: {rider.lap_time}</Text>
          <Text>Last Lap Time: {rider.last_lap_time}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default RiderCard;
