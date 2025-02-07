import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";

import Message from "./components/Message";

// Define types for the message structure
interface Message {
  id: string;
  type: "user" | "bot"; 
  message: string;
}

export default function ChatScreen() {
  const [message, setMessage] = useState<string>(""); // user input
  const [messages, setMessages] = useState<Message[]>([]); 
  const [isLoading, setIsloading] = useState<boolean>(false);//loading state 

  const genAI = new GoogleGenerativeAI("AIzaSyAj8swRk_cBt0pz0xYufTvEEfLAw9koUsA");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const sendMessage = async () => {
    if (message.trim() === "") return;

    setIsloading(true);

    try {
      const result = await model.generateContent(message);
      const response = result.response;
      console.log(response.text());

      const userMessage: Message = {
        id: messages.length + Math.random().toString(36).substring(2, 5),
        type: "user",
        message: message,
      };

      const botMessage: Message = {
        id: messages.length + Math.random().toString(36).substring(1, 3),
        type: "bot", 
        message: response.text(), 
      };

      setMessages([...messages, userMessage, botMessage]);
    } catch (e) {
      console.log("Error: " + e);
    } finally {
      setMessage("");
      setIsloading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Message type={item.type} message={item.message}/>}
      />
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.clearButton, isLoading && styles.disableButton]}  onPress={clearChat} ><Text>Clear Chat</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.sendButton, isLoading && styles.disableButton]}  onPress={sendMessage}><Text>Send</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end",
  },
  message: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
   
    marginTop:10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding:10,
    margin:10
  },
  sendButton:{
    backgroundColor: '#7589C9',
    paddingHorizontal:20,
    paddingVertical: 15,
    borderRadius: 5,
   
  },
  disableButton:{
    backgroundColor: '#B3B3B3',
    paddingHorizontal:20,
    paddingVertical: 15,
    borderRadius: 5,

  },
  clearButton:{
    backgroundColor: '#E72529',
    paddingHorizontal:15,
    paddingVertical: 10,
    borderRadius: 5,
 
  }
});
