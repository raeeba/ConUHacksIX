import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, TextInput, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";

export default function CharSelect() {
  const [selectedChar, setSelectedChar] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [charName, setCharName] = useState('');
  const router = useRouter();
  const { email } = useLocalSearchParams(); // Get email from URL params

  const handleCharSelect = (char: string) => {
    setSelectedChar(char);
    setModalVisible(true);
  };

  const handleNameSubmit = async () => {
    if (!selectedChar || !charName) {
      Alert.alert("Error", "Please select a pet and give it a name!");
      return;
    }

    try {
      console.log("Sending pet data to:", `${API_URL}/updatePet`);
      const response = await axios.post(`${API_URL}/updatePet`, {
        email, // Email from route params
        petType: selectedChar,
        petName: charName
      });

      if (response.status === 200) {
        console.log("Pet selection saved successfully:", response.data);
        router.push("/homepage");
      } else {
        Alert.alert("Error", "Failed to save pet information.");
      }
    } catch (error) {
      console.error("Error saving pet:", error);
      Alert.alert("Error", error.response?.data?.error || "Server error");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Please select your pet!</Text>
      <View style={styles.charContainer}>
        <TouchableOpacity onPress={() => handleCharSelect('Matcha')}>
          <Image source={require('../assets/images/char_matcha.png')} style={styles.charImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleCharSelect('Sakura')}>
          <Image source={require('../assets/images/char_sakura.png')} style={styles.charImage} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Give your pet a name!</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              value={charName}
              onChangeText={setCharName}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleNameSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7e9', 
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: '#c76a7b', 
  },
  charContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  charImage: {
    width: 170,
    height: 170,
    marginHorizontal: 10, 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#c76a7b', 

  },
  input: {
    width: '100%',
    height: 40,
    color: '#c76a7b', 
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  submitButton: {
    padding: 10,
    backgroundColor: '#f7e0f7',
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#c76a7b', 
    fontSize: 18,
  },
});