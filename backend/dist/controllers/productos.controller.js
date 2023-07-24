"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProducto = exports.updateProducto = exports.createProducto = exports.getAllProductos = void 0;
const Producto_1 = __importDefault(require("../models/Producto"));
const getAllProductos = async (req, res) => {
    try {
        const productos = await Producto_1.default.findAll();
        res.json(productos);
    }
    catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
};
exports.getAllProductos = getAllProductos;
const createProducto = async (req, res) => {
    const { nombre, descripcion, codigo, precio } = req.body;
    try {
        const nuevoProducto = await Producto_1.default.create({
            nombre,
            descripcion,
            codigo,
            precio,
        });
        res.json(nuevoProducto);
    }
    catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ message: 'Error al crear producto' });
    }
};
exports.createProducto = createProducto;
const updateProducto = async (req, res) => {
    const productoId = req.params.id;
    const { nombre, descripcion, codigo, precio } = req.body;
    try {
        const producto = await Producto_1.default.findByPk(productoId);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.codigo = codigo;
        producto.precio = precio;
        await producto.save();
        res.json(producto);
    }
    catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ message: 'Error al actualizar producto' });
    }
};
exports.updateProducto = updateProducto;
const deleteProducto = async (req, res) => {
    const productoId = req.params.id;
    try {
        const producto = await Producto_1.default.findByPk(productoId);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        await producto.destroy();
        res.json({ message: 'Producto eliminado correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ message: 'Error al eliminar producto' });
    }
};
exports.deleteProducto = deleteProducto;
