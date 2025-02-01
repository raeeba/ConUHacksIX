import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useRef } from 'react';

// Index
const Index = () => {
  return (
    <View style={styles.container}>
      <Text>Tab /index.tsx </Text>
    </View>
  );
}; 

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Index;