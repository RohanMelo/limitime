
import uuid from 'uuid-random'

export const conversaoMilisegundos = (ms) => {
    const segundos = Math.floor((ms / 1000) % 60);
    const minutos = Math.floor((ms / 1000 / 60) % 60);
    const horas = Math.floor(ms / 1000 / 60 / 60);

    const resultado = [
        pad(horas.toString(), 2),
        pad(minutos.toString(), 2),
        pad(segundos.toString(), 2),
    ].join(':');

    return resultado;
};

const pad = (numberString, size) => {
    let padded = numberString;
    while (padded.length < size) {
        padded = `0${padded}`;
    }
    return padded;
};

export const newTimer = (attrs = {}) => {
    const timer = {
        titulo: attrs.titulo || 'New Timer',
        id: uuid(),
        decorrido: 0,

    };

    return timer;
};