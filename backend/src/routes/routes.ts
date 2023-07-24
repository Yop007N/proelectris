import { Router } from 'express';
import {
  getAllClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from '../controllers/clientes.controller';
import {
  getAllProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} from '../controllers/productos.controller';

const router = Router();

// Rutas para clientes
router.get('/clientes', getAllClientes);
router.post('/clientes', createCliente);
router.put('/clientes/:id', updateCliente);
router.delete('/clientes/:id', deleteCliente);

// Rutas para productos
router.get('/productos', getAllProductos);
router.post('/productos', createProducto);
router.put('/productos/:id', updateProducto);
router.delete('/productos/:id', deleteProducto);

export default router;
