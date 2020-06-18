import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'

import Timer from './components/Timer'
import { newTimer } from './utils/TimerUtils'

// TODO: Set dimensions dinamically using Dimensions API

const App = () => {

  const [isModalVisible, setModalVisible] = useState(false)
  const [inputText, setInputText] = useState('')
  const [timers, setTimers] = useState([])

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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

      </View>

      {/* ------------------------------- Modal Code ------------------------------- */}

      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modal}>
          <TextInput
            label='Timer Title'
            value={inputText}
            onChangeText={text => setInputText(text)}
            style={styles.textInput}
          />
          <Button icon="check" mode="contained" color="purple" labelStyle={styles.addButtonText} style={styles.modalButtonConfirm} onPress={handleNewTimer} >CONFIRM</Button>
          <Button icon="close" mode="contained" color="crimson" labelStyle={styles.addButtonText} style={styles.modalButtonCancel} onPress={toggleModal}>CLOSE</Button>
        </View>
      </Modal>

      {/* ---------------------------- End of Modal code --------------------------- */}

      <ScrollView>
        {timers && timers.map((timer) => (
          <Card style={styles.card} key={timer.id}>
            <Timer id={timer.id} titulo={timer.titulo} decorrido={timer.decorrido} />
            <Button style={styles.removeButton} labelStyle={styles.removeButtonText} onPress={() => handleOnRemove(timer.id)}>Remove</Button>

          </Card>
        ))}

      </ScrollView>
      <Icon name="md-clock" size={200} color='#FBB6CE' style={styles.clockIcon} />
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
    marginTop: 10,
    paddingHorizontal: 40,
    marginBottom: 20
  },
  addButton: {
    borderRadius: 50
  },
  addButtonText: {
    fontWeight: 'bold',
  },
  modal: {
    backgroundColor: '#2D3748',
    padding: 10,
  },
  textInput: {
    marginTop: 10,
  },
  modalButtonConfirm: {
    borderRadius: 50,
    padding: 6,
    marginTop: 20
  },
  modalButtonCancel: {
    borderRadius: 50,
    padding: 6,
    marginTop: 5
  },
  card: {
    marginTop: 10,
    backgroundColor: '#fff'
  },
  removeButton: {
    backgroundColor: '#4A5568',
  },
  removeButtonText: {
    color: '#FBB6CE',
    fontSize: 20
  },
  clockIcon: {
    alignSelf: 'center',
    marginTop: 10
  }
});

export default App;
