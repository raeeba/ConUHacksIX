import React from "react";
import { View, Image, StyleSheet } from "react-native";

interface PetCharacterProps {
  characterType: "1" | "2";
  mood: "happy" | "sad" | "normal";
}
export default function PetCharacter({ characterType, mood }: PetCharacterProps) {
    let characterImage;

    if (characterType === "1") {
        if (mood === "happy") {
            characterImage = require("../assets/images/char_matcha_happy.png");
        } else if (mood === "sad") {
            characterImage = require("../assets/images/char_matcha_sad.png");
        } else {
            characterImage = require("../assets/images/char_matcha.png");
        }
    } else {
        if (mood === "happy") {
            characterImage = require("../assets/images/char_sakura_happy.png");
        } else if (mood === "sad") {
            characterImage = require("../assets/images/char_sakura_sad.png");
        } else {
            characterImage = require("../assets/images/char_sakura.png");
        }
    } 


    return (
        <View style={styles.container}>
            <Image source={characterImage} style={styles.characterImage} />
        </View>
        );
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: 80,
        },
        characterImage: {
            width: 200,
            height: 200,
        },
    });