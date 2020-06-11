/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';
import Modal from 'react-native-modal';

import Timer from './components/Timer'
import { newTimer } from './utils/TimerUtils'

const App = () => {

  const [isModalVisible, setModalVisible] = useState(false)
  const [inputText, setInputText] = useState('')
  const [timers, setTimers] = useState([])

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // const initialTimers = [{
  //   key: 1,
  //   id: 1,
  //   titulo: 'Tarefa Exemplo',
  //   decorrido: 0,
  //   isActive: true,

  // }]
  const handleNewTimer = () => {
    let timerNovo = newTimer({ titulo: inputText })
    setTimers([timerNovo, ...timers])
    setInputText('')
    toggleModal()
  }

  const handleOnRemove = (id) => {
    setTimers(timers.filter((timer) => timer.id !== id))

  }


  return (

    <View style={styles.container}>

      <View style={styles.addButtonContainer}>
        <Button icon="plus" mode="contained" color="purple" style={styles.addButton} labelStyle={styles.addButtonText} onPress={toggleModal}>
          ADD TIMER
        </Button>
        <Text>Just some text</Text>

      </View>

      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modal}>
          <TextInput
            label='Timer Title'
            value={inputText}
            onChangeText={text => setInputText(text)}
            style={styles.textInput}
          />
          <Button icon="check" mode="contained" color="purple" labelStyle={styles.addButtonText} style={styles.modalButton} onPress={handleNewTimer} >CONFIRM</Button>
          <Button icon="close" mode="contained" color="red" labelStyle={styles.addButtonText} style={styles.modalButton} onPress={toggleModal}>CLOSE</Button>
        </View>
      </Modal>

      <ScrollView>
        {timers && timers.map((timer) => (
          <Card style={styles.card} key={timer.id}>
            <Timer id={timer.id} titulo={timer.titulo} decorrido={timer.decorrido} />
            <Button onPress={() => handleOnRemove(timer.id)}>Remove</Button>

          </Card>
        ))}
      </ScrollView>
    </View>



  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#2D3748',
    padding: 8,
  },
  addButtonContainer: {
    marginTop: 20,
    paddingHorizontal: 40,
  },
  addButton: {
    borderRadius: 50
  },
  addButtonText: {
    fontWeight: 'bold',

  },
  modal: {
    backgroundColor: '#fff',

    padding: 8,

  },
  textInput: {
    marginTop: 10,
  },
  modalButton: {
    borderRadius: 50,
    padding: 6,
    marginTop: 10
  },
  card: {
    marginTop: 10,
    backgroundColor: '#fff'
  }
});

export default App;
