import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import { fetchMotoGPLiveData } from '../../api/MotoGPApi'; // Pastikan path ini benar
import styles from './HomeScreenStyle';
import RiderCard from '../components/RiderCard';

const HomeScreen = () => {
  const [riders, setRiders] = useState([]);
  const [eventInfo, setEventInfo] = useState(null);
  const [selectedRider, setSelectedRider] = useState(null); // Untuk melacak pembalap yang dipilih
  const [modalVisible, setModalVisible] = useState(false); // Untuk modal

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchMotoGPLiveData();
        setEventInfo(data.head);
        setRiders(Object.values(data.rider));
      } catch (error) {
        console.error("Error loading live timing data", error);
      }
    };

    getData();
  }, []);

  const handleRiderSelect = (rider) => {
    setSelectedRider(rider);
    setModalVisible(true); // Tampilkan modal
  };

  return (
    <View style={styles.container}>
      {eventInfo && (
        <Text style={styles.header}>
          {eventInfo.event_tv_name} - {eventInfo.circuit_name}
        </Text>
      )}
      <FlatList
        data={riders}
        keyExtractor={(item) => item.rider_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handleRiderSelect(item)}>
            <Text style={styles.name}>{item.rider_name} {item.rider_surname}</Text>
            <Text style={styles.team}>Team: {item.team_name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal untuk detail pembalap */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false} // Menutupi seluruh layar
      >
        <View style={styles.modalContainer}>
          {selectedRider && (
            <>
              <Text style={styles.modalName}>
                {selectedRider.rider_name} {selectedRider.rider_surname}
              </Text>
              <Text style={styles.modalDetail}>Team: {selectedRider.team_name}</Text>
              <Text style={styles.modalDetail}>Position: {selectedRider.pos}</Text>
              <Text style={styles.modalDetail}>Lap Time: {selectedRider.lap_time}</Text>
              <Text style={styles.modalDetail}>Last Lap Time: {selectedRider.last_lap_time}</Text>
            </>
          )}
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
