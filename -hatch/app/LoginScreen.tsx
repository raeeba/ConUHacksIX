import { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, ImageBackground, TouchableOpacity } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

const API_URL = "http://192.X.X.X:5000"; // change this to the ip address of the exp url for ios simulator to work (e.g., "http://192.168.X.X:5000")

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); 

  const handleRedirectToRegistration = () => {
    router.push('/RegisterScreen'); 
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and password are required");
      return;
    }
  
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
  
      console.log("Response:", response.data); // debug
  
      if (response.status === 200 && response.data.user) {
        Alert.alert("Success", "Login successful!");
        router.replace("/(tabs)/homepage"); // navigate to homepage
      } else {
        Alert.alert("Login Failed", response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login Error:", error); // debug
      if (error.response) {
        // If server response exists, show that error message
        Alert.alert("Login Failed", error.response?.data?.message || "Something went wrong");
      } else {
        // If network or server error occurs
        Alert.alert("Login Failed", "Network error or server is down");
      }
    }
  };
  
  

  return (
    <View style={styles.container}>
      {/*<ImageBackground source={require('.../../assets/images/green_login-bg.png')}>*/}
      <Image source={require('../assets/images/logo.png')} style={styles.logo}/> {/** logo */}
      <TextInput 
        style={styles.input} 
        placeholder="Enter email " 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Enter password" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
      />
      <TouchableOpacity style={styles.startButton} onPress={handleLogin}>
              <Image source={require('../assets/images/start_button.png')} style={styles.buttonImage}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.startButton} onPress={handleRedirectToRegistration}>
              <Image source={require('../assets/images/char_sakura.png')} style={styles.buttonImage}/>
      </TouchableOpacity>
      {/*<Button title="Register" color="#BEDABE" onPress={handleRedirectToRegistration}></Button>*/}
      {/*</ImageBackground>*/}
    </View>
  );
};

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
    borderBottomWidth: 2,  
    borderColor: '#4CAF50',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    paddingLeft: 10,              
    fontSize: 16,                 
    color: '#333',                
    marginVertical: 10,
    backgroundColor: '#BEDABE'
  },
  startButton: {
    alignItems: "center",
  },
  buttonImage: {
    width: 160, 
    height: 75, 
  },
});

export default LoginScreen;