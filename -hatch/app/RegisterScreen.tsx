import { useState } from "react"; 
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Image, ImageBackground, ActivityIndicator} from "react-native";
// import axios from "axios";
import { useRouter } from 'expo-router';

// Firebase Setup
import { FIREBASE_DB, FIREBASE_AUTH } from "@/FirebaseConfig";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const router = useRouter(); // To navigate to character selection screen
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH; // db authentication

/*const handleRegister = async () => {
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
};*/

  const addUser = async () => {
    // debugging
    console.log("addUser function triggered!");
    console.log(FIREBASE_DB); // ensure firestore instance initialization
    console.log(FIREBASE_DB)
    try {
      const docRef = await addDoc(collection(FIREBASE_DB, "users"), {
        name: name,
        email: email,
        password: password
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password); // Add to Firebase Authentication
      addUser(); // Add to Firestore DB
      console.log(response);
    } catch (error : any){
      console.log(error);
      alert('Registration Failed');
      //alert('registration failed: ' + error.message); // debugging
    } finally {
      setLoading(false);
    }
  }


  // NOTE: Don't put comments {/* */} in the return() function!
  // Doing so might give you the following error: "Text strings must be rendered in <Text> component."
  return (
    <ImageBackground source={require('../assets/images/login-background.png')}  style={styles.background}
      resizeMode="cover">
    <View style={styles.container}>
    <Image source={require('../assets/images/logo.png')} style={styles.logo}/> 
    <TextInput 
      style={styles.input} 
      placeholder="enter your name" 
      placeholderTextColor={styles.input.color}
      value={name} 
      onChangeText={setName}
    />
    <TextInput 
      style={styles.input} 
      placeholder=" enter your email address" 
      placeholderTextColor={styles.input.color}
      value={email} 
      onChangeText={setEmail} 
      keyboardType="email-address"
    />
    <TextInput 
      style={styles.input} 
      placeholder="enter your password" 
      placeholderTextColor={styles.input.color}
      value={password} 
      onChangeText={setPassword}
      secureTextEntry
    />
    <TouchableOpacity style={styles.startButton} onPress={() => {
          signUp();
          router.push("/CharSelectScreen");
        }
      }>
        <Image source={require('../assets/images/register_button.png')} style={styles.buttonImage}/>
    </TouchableOpacity>

    <Button title="Back" color="#BEDABE" onPress={() => router.back()}></Button>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  /*container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "#e0f7e9", 
    backgroundColor: "#e0f7e0", 
  },*/
  background: {
    justifyContent: "center", 
    alignItems: "center",
    flex: 1
  },
  container: {
    padding: 20
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
    backgroundColor: '#BEDABE'
  },
  startButton: {
    alignItems: "center",
  },
  buttonImage: {
    width: 175, 
    height: 75, 
  },
});

export default RegisterScreen;

