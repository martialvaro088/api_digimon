const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint para obtener datos de un Digimon específico
app.get('/obtenerDatosDigimon', async (req, res) => {
    try {
        let nombreDigimon = req.query.valor;

        if (!nombreDigimon) {
            // Si no se proporciona un nombre de Digimon, obtener todos los Digimons
            const respuestaApi = await axios.get(`https://digimon-api.vercel.app/api/digimon`);
            res.json(respuestaApi.data);
        } else {
            // Si se proporciona un nombre de Digimon, buscar el Digimon específico
            const respuestaApi = await axios.get(`https://digimon-api.vercel.app/api/digimon/name/${nombreDigimon}`);
            res.json(respuestaApi.data);
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: `Error al obtener los datos` });
    }
});


// Servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});


/* app.get('/obtenerDatosDigimon', async (req, res) => {
    try {
        let nombreDigimon = req.query.valor;

        // Construir la URL con el nombre del digimon
        const respuestaApi = await axios.get(`https://digimon-api.vercel.app/api/digimon/name/${nombreDigimon}`);
        res.json(respuestaApi.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({error: `Error al obtener los datos`});
    }
}); */

