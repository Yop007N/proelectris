import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // Importa el paquete cors
import routes from './routes/routes';

const app = express();
const PORT = 3000;

// Configura CORS para permitir todas las solicitudes de cualquier origen
app.use(cors());

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
