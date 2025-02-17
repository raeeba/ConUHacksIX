import { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, Image, ImageBackground, TouchableOpacity, ActivityIndicator } from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";
import UserModel from '../models/userModel';


import { FIREBASE_DB, FIREBASE_AUTH } from "@/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading ] = useState(false);
  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const router = useRouter(); 
  const [user] = useState(new UserModel());

  //debugging
  // mongo db
  /*const handleLogin = async () => {
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
  };*/

  /*const signIn = async () =>{
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      router.push("/(tabs)/homepage");
    } catch (error : any){
      console.log(error);
      alert('Invalid email or password');
      // alert('login failed: ' + error.message); // debugging
    } finally {
      setLoading(false);
    }
  }*/
  
  // debugging 
  /*const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error : any){
      console.log(error);
      alert('Registration Failed');
      //alert('registration failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  }*/
  

  //* NOTE: Don't put comments {/* */} in the return() function!
  //* Doing so might give you the following error: "Text strings must be rendered in <Text> component."
  return (
    <ImageBackground source={require('../assets/images/login-bg-30.png')}  style={styles.background}
  resizeMode="cover">
    <View style={styles.container}>
      
      <Image source={require('../assets/images/logo.png')} style={styles.logo}/> 
      <TextInput 
        style={styles.input} 
        placeholder="enter your email address" 
        placeholderTextColor={styles.input.color} 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="enter your password" 
        placeholderTextColor={styles.input.color} 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry={true}
      />

      { loading ? <ActivityIndicator size="large" color="#000ff"/>
      : <>
      <TouchableOpacity style={styles.button} onPress={async ()=> {
        try{
          await user.loginUser(email, password);
          const userPetType = await user.getUserDataByField(email, "pet");

          console.log("User pet type in login:", userPetType);
          if (userPetType !== null && userPetType !== undefined){

            if (userPetType === 0){
              router.push("/CharSelectScreen");
            } else {
              console.log("Error fetching pet type.")
              alert("Error fetching pet type."+ userPetType);
            }
          } else {
            console.log("Error fetching pet type in registration undefined. petType: ");
            alert("Error fetching pet type in registration undefined. petType: ");
          }
        } catch (error){
          console.error("Error occurred during registration.")
        }
      }}>
              <Image source={require('../assets/images/start_button.png')} style={styles.buttonImage}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {
        router.push('/RegisterScreen');
      }}>
              <Image source={require('../assets/images/register_button.png')} style={styles.buttonImage}/>
      </TouchableOpacity>
      
      </>}

      </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  /*container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0f7e0", 
  },*/
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
  },
  logo: {
    width: 320,
    height: 100
  },
  input: {
    width: 300,
    height: 40,
    borderBottomWidth: 2,  
    borderColor: '#bb6f7c',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    paddingLeft: 10,              
    fontSize: 16,                 
    color: '#bb6f7c',               
    marginVertical: 10,
    backgroundColor: '#BEDABE',
  },
  button: {
    alignItems: "center",
  },
  buttonImage: {
    width: 175, 
    height: 75, 
  },
});

export default LoginScreen;