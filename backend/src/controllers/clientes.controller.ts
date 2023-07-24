import { Request, Response } from 'express';
import  Cliente  from '../models/Cliente';

export const getAllClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ message: 'Error al obtener clientes' });
  }
};

export const createCliente = async (req: Request, res: Response) => {
  const { nombre, direccion, telefono, email, ruc, ci } = req.body;
  try {
    const nuevoCliente = await Cliente.create({
      nombre,
      direccion,
      telefono,
      email,
      ruc,
      ci,
    });
    res.json(nuevoCliente);
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ message: 'Error al crear cliente' });
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  const clienteId = req.params.id;
  const { nombre, direccion, telefono, email, ruc, ci } = req.body;
  try {
    const cliente = await Cliente.findByPk(clienteId);
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
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ message: 'Error al actualizar cliente' });
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  const clienteId = req.params.id;
  try {
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    await cliente.destroy();
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ message: 'Error al eliminar cliente' });
  }
};
