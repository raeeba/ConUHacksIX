import { useState } from "react"; 
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from "axios";
import { useRouter } from 'expo-router';

const API_URL = "http://192.X.X.X:5000"; // change this to the ip address of the exp url for ios simulator to work (e.g., "http://192.168.X.X:5000")

const RegisterScreen = () => {
  const router = useRouter(); // to navigate to char select screen
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEnter = () => {
    router.push('/char_select'); 
  };

  const handleRedirectToLogin = () =>{
    router.push('/LoginScreen');
  }

const handleRegister = async () => {
  if (!name || !email || !password) {
    Alert.alert("Error", "All fields are required");
    return;
  }

  try {
    console.log("Sending request to:", `${API_URL}/register`);
    const response = await axios.post(`${API_URL}/register`, { name, email, password });

    if (response.status === 201) {
      Alert.alert("Success", "User registered successfully!");
      router.replace(`/char_select/${encodeURIComponent(email)}`);
    } else {
      Alert.alert("Error", "Unexpected response from server.");
    }
  } catch (error) {
    console.error("Registration error:", error);
    Alert.alert("Error", error.response?.data?.error || "Server error");
  }
};


  return (
    <View style={styles.container}>
    {/*<ImageBackground source={require('.../../assets/images/green_login-bg.png')}>*/}
    <Image source={require('../assets/images/logo.png')} style={styles.logo}/> {/** logo */}
    <TextInput 
      style={styles.input} 
      placeholder="Name" 
      value={name} 
      onChangeText={setName}
    />
    <TextInput 
      style={styles.input} 
      placeholder="Email" 
      value={email} 
      onChangeText={setEmail} 
      keyboardType="email-address"
    />
    <TextInput 
      style={styles.input} 
      placeholder="Password" 
      value={password} 
      onChangeText={setPassword}
      secureTextEntry
    />
    <TouchableOpacity style={styles.startButton} onPress={handleRegister}>
            <Image source={require('../assets/images/start_button.png')} style={styles.buttonImage}/>
    </TouchableOpacity>

    <TouchableOpacity style={styles.startButton} onPress={handleRedirectToLogin}>
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

export default RegisterScreen;

