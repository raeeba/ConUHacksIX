import React from "react";
import {Button, StyleSheet, Text, View} from 'react-native';


interface MessageProp{
  type: "user" | "bot",
  message: string
}

const Message: React.FC<MessageProp> = ({ type, message }) => {
  return (
    <View style={ [styles.messageContainer, { backgroundColor: type === "user" ? "#d1f7d6" : "#f1f1f1" }]}>
      <Text style={styles.userType}>{type === "user" ? "You" : "Bot"}: </Text>
      <Text>{message}</Text>
    </View>
  );
  
};


const styles = StyleSheet.create(
  {
    messageContainer: {
      padding: 10,
      marginBottom: 10,
      borderRadius:5
    },
    userType:{
      fontSize:15,
      fontWeight: 'bold',
      marginBottom: 5
    }
  });

export default Message;