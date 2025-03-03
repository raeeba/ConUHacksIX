import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, TextInput, Alert, ImageBackground } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import UserModel from '../models/userModel';

const CharSelectScreen = () =>{
  // Pet name form
  //? IDEA: We could add more fields to the form (i.e., gender, favourite foods, etc.)
  const [modalVisible, setModalVisible] = useState(false);
  
  const [selectedPetType, setSelectedPetType] = useState(0);
  const [petName, setPetName] = useState('');
  const [user] = useState(new UserModel());

  const router = useRouter();
  const { userEmail } = useLocalSearchParams(); // Get the user's email from the Login Screen.
  const email = Array.isArray(userEmail) ? userEmail[0] : userEmail;

  const setPetType = (petType: number) => {
    console.log("Get pet type is: " + petType);
    setSelectedPetType(petType);
    setModalVisible(true);
  }

  /*const selectPet = (petType: number) => {
    setSelectedPetType(petType);
    console.log("Selected pet type is: " + petType);
    setModalVisible(true);
  }*/

  return (
    <ImageBackground source={require('../assets/images/login-bg-30.png')}  style={styles.background}
          resizeMode="cover"> 
    <View style={styles.container}>
      <Text style={styles.title}>choose your pet! </Text>
      <Text> "{userEmail}"</Text>
      <Text> "{selectedPetType}"</Text>
      <View style={styles.charContainer}>

        <TouchableOpacity style={styles.charImage} onPress={() => setPetType(1)}>
          <Image source={require('../assets/images/char_matcha.png')} style={styles.charImage} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.charImage} onPress={() => setPetType(2)}>
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
            <Text style={styles.modalText}>give your pet a name!</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter name"
              value={petName}
              onChangeText={setPetName}
            />
            <TouchableOpacity style={styles.submitButton} onPress={()=>user.choosePet(email, selectedPetType, petName)}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    justifyContent: "center", 
    alignItems: "center",
    flex: 1
  },
  container: {
    padding: 20
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

export default CharSelectScreen;