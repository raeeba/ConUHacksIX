import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  const handleEnter = () => {
    router.push('/char_select'); 
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain"/>
      <TouchableOpacity style={styles.startButton} onPress={handleEnter}>
        <Image source={require('../assets/images/start_button.png')} style={styles.buttonImage}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0f7e9", 
  },
  logo: {
    width: 320,
    height: 200,
    marginBottom: 20,
    
  },
  startButton: {
    marginTop: 20,
    alignItems: "center",
  },
  buttonImage: {
    width: 160, 
    height: 75, 
  },
});