"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_controller_1 = require("../controllers/clientes.controller");
const productos_controller_1 = require("../controllers/productos.controller");
const router = (0, express_1.Router)();
// Rutas para clientes
router.get('/clientes', clientes_controller_1.getAllClientes);
router.post('/clientes', clientes_controller_1.createCliente);
router.put('/clientes/:id', clientes_controller_1.updateCliente);
router.delete('/clientes/:id', clientes_controller_1.deleteCliente);
// Rutas para productos
router.get('/productos', productos_controller_1.getAllProductos);
router.post('/productos', productos_controller_1.createProducto);
router.put('/productos/:id', productos_controller_1.updateProducto);
router.delete('/productos/:id', productos_controller_1.deleteProducto);
exports.default = router;
