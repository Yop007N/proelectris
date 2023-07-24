"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCliente = exports.updateCliente = exports.createCliente = exports.getAllClientes = void 0;
const Cliente_1 = __importDefault(require("../models/Cliente"));
const getAllClientes = async (req, res) => {
    try {
        const clientes = await Cliente_1.default.findAll();
        res.json(clientes);
    }
    catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ message: 'Error al obtener clientes' });
    }
};
exports.getAllClientes = getAllClientes;
const createCliente = async (req, res) => {
    const { nombre, direccion, telefono, email, ruc, ci } = req.body;
    try {
        const nuevoCliente = await Cliente_1.default.create({
            nombre,
            direccion,
            telefono,
            email,
            ruc,
            ci,
        });
        res.json(nuevoCliente);
    }
    catch (error) {
        console.error('Error al crear cliente:', error);
        res.status(500).json({ message: 'Error al crear cliente' });
    }
};
exports.createCliente = createCliente;
const updateCliente = async (req, res) => {
    const clienteId = req.params.id;
    const { nombre, direccion, telefono, email, ruc, ci } = req.body;
    try {
        const cliente = await Cliente_1.default.findByPk(clienteId);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        cliente.nombre = nombre;
        cliente.direccion = direccion;
        cliente.telefono = telefono;
        cliente.email = email;
        cliente.ruc = ruc;
        cliente.ci = ci;
        await cliente.save();
        res.json(cliente);
    }
    catch (error) {
        console.error('Error al actualizar cliente:', error);
        res.status(500).json({ message: 'Error al actualizar cliente' });
    }
};
exports.updateCliente = updateCliente;
const deleteCliente = async (req, res) => {
    const clienteId = req.params.id;
    try {
        const cliente = await Cliente_1.default.findByPk(clienteId);
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        await cliente.destroy();
        res.json({ message: 'Cliente eliminado correctamente' });
    }
    catch (error) {
        console.error('Error al eliminar cliente:', error);
        res.status(500).json({ message: 'Error al eliminar cliente' });
    }
};
exports.deleteCliente = deleteCliente;
