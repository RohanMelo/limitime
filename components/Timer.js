/* eslint-disable */
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

                <Button onPress={toggle}>{!isRunning ? 'Start' : 'Pause'}</Button>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    titulo: {
        fontWeight: 'bold',
        fontSize: 12,

    },
    decorrido: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'
    },
    botoes: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    card: {
        marginTop: 10,
    },

})