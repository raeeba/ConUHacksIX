import { Text, View, Image, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleEnter = () => {
    router.push('/char_select'); 
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo}/>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.startButton} onPress={handleEnter}>
        <Image source={require('../../assets/images/start_button.png')} style={styles.buttonImage}/>
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
    height: 100
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  startButton: {
    alignItems: "center",
  },
  buttonImage: {
    width: 160, 
    height: 75, 
  },
});