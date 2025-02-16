import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Image,TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Grid, Col} from "react-native-easy-grid"
import { CheckBox } from 'react-native-elements';

const TimerApp: React.FC = () => {

    // for the timer
    const [inputTime, setInputTime] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [addTaskModalVisible, setAddTaskModalVisible] = useState<boolean>(false);

    // for checkboxes
    const [checkboxes, setCheckboxes] = useState<{ id: number; checked: boolean }[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [list, setList] = useState<{ id: string; text: string; checked: boolean }[]>([]);
    useEffect(() => {
        if (!isRunning || timeLeft === 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    // start timer
    const startTimer = () => {
        if (timeLeft > 0) {
            setIsRunning(true);
        }
    };

    // stop timer
    const stopTimer = () => setIsRunning(false);
    
    // reset timer
    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(0);
        setInputTime('');
    };

    // set time
    const handleSetTime = () => {
        const parsedTime = parseInt(inputTime, 10);
        if (!isNaN(parsedTime) && parsedTime > 0) {
          setTimeLeft(parsedTime * 60); 
          setIsRunning(false);
          setModalVisible(false);
        }
      };
    
      
      const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      };

    // add a task
    const addTask = () => {
        if (inputValue.trim()) {
            setList((prevList) => [
                ...prevList,
                { id: Date.now().toString(), text: inputValue, checked: false },
            ]);
            setInputValue('');
            setAddTaskModalVisible(false);
        }
    };
    
    // method to switch the state of the checkbox (checked or unchecked)
    const checkCheckbox = (id: string) => {
        setList((prevList) =>
        prevList.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        )
        );
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.header}>What are we doing today?</Text>
            <Button title="Set a Timer" onPress={() => setModalVisible(true)} />
            
            {/* Timer Modal */}
            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Enter Time (in minutes):</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Enter time in minutes"
                            value={inputTime}
                            onChangeText={setInputTime}
                        />
                        <Button title="Enter" onPress={handleSetTime} />
                        <Button title="Cancel" onPress={() => setModalVisible(false)} />
                    </View>
                </View>
            </Modal>
            {/* add task  */}
            <Modal
                visible={addTaskModalVisible}
                animationType="fade"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Enter Task:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter task name"
                            value={inputValue}
                            onChangeText={setInputValue}
                        />
                        <Button title="Add" onPress={addTask} />
                        <Button title="Cancel" onPress={() => setAddTaskModalVisible(false)} />
                    </View>
                </View>
            </Modal>
            <Grid>
                <Col>
                    <TouchableOpacity onPress={startTimer} disabled={isRunning || timeLeft <= 0}>
                        <Image source={require('../../assets/images/start-button-timer.png')} resizeMode="contain" style={styles.icon} />
                    </TouchableOpacity>
                </Col>
                <Col>
                    <View style={styles.timerContainer}>
                        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
                    </View>
                </Col>
                <Col>
                    <TouchableOpacity onPress={stopTimer} disabled={!isRunning}>
                        <Image source={require('../../assets/images/stop-button.png')} resizeMode="contain" style={styles.icon} />
                    </TouchableOpacity>
                </Col>
            </Grid>
            <View style={styles.buttonContainer}>
                <Button title="Reset" onPress={resetTimer} />
            </View>
            <TouchableOpacity style={styles.addTaskButton}onPress={() => setAddTaskModalVisible(true)}>
                    <Image source={require('../../assets/images/char_matcha.png')} resizeMode="contain" style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.taskContainer}>
                <FlatList
                    data={list}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.taskItem}>
                            <CheckBox
                                checked={item.checked}
                                onPress={() => checkCheckbox(item.id)}
                            />
                            <Text style={styles.taskText}>{item.text}</Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        width: 200,
        marginBottom: 10,
        textAlign: 'center',
    },
    timerContainer: {
        marginVertical: 20,
        padding: 20,
        borderWidth: 2,
        borderRadius: 50,
        borderColor: '#f39c12',
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
    },
    timerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: 300,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    icon:{
        height: 100,
        width: 100,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: -5,
    },
    taskText: {
        fontSize: 16,
        marginLeft: 10,
    },
    formContainer: {
        marginTop: 20,
        width: '100%',
    },
    taskContainer: {
        marginTop: 10,
        width: '100%',
    },
    addTaskButton: {
        position: 'absolute',  
        right: 20,  
        bottom: 20,  
        padding: 10,  
        zIndex: 100,
    },
    
});
export default TimerApp;