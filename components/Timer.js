import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { conversaoMilisegundos } from '../utils/TimerUtils';
import { Button } from 'react-native-paper'



export default function Timer({ titulo }) {

    const [milliSeconds, setMilliseconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    function toggle() {
        setIsRunning(!isRunning);
    }
    const stringDecorrido = conversaoMilisegundos(milliSeconds);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setMilliseconds(milliSeconds => milliSeconds + 1000);
            }, 1000);
        } else if (!isRunning && milliSeconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, milliSeconds]);


    return (

        <View style={styles.containerTimer}>
            <Text style={styles.titulo}>{titulo}</Text>

            <Text style={styles.decorrido}>{stringDecorrido}</Text>
            <View style={styles.botoes}>

                <Button labelStyle={styles.startButton} onPress={toggle}>{!isRunning ? 'Start' : 'Pause'}</Button>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    containerTimer: {
        backgroundColor: '#4A5568',

    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
        marginTop: 10,
        marginLeft: 10

    },
    decorrido: {
        fontWeight: 'bold',
        fontSize: 50,
        textAlign: 'center',
        color: 'white',
        letterSpacing: 1
    },
    botoes: {
        display: 'flex',
        marginTop: 10

    },
    card: {
        marginTop: 10,
    },
    startButton: {
        color: '#FBB6CE',
        fontSize: 20
    }

})