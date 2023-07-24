import { Request, Response } from 'express';
import  Producto  from '../models/Producto';

export const getAllProductos = async (req: Request, res: Response) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

export const createProducto = async (req: Request, res: Response) => {
  const { nombre, descripcion, codigo, precio } = req.body;
  try {
    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      codigo,
      precio,
    });
    res.json(nuevoProducto);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear producto' });
  }
};

export const updateProducto = async (req: Request, res: Response) => {
  const productoId = req.params.id;
  const { nombre, descripcion, codigo, precio } = req.body;
  try {
    const producto = await Producto.findByPk(productoId);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    producto.nombre = nombre;
    producto.descripcion = descripcion;
    producto.codigo = codigo;
    producto.precio = precio;
    await producto.save();
    res.json(producto);
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
};

export const deleteProducto = async (req: Request, res: Response) => {
  const productoId = req.params.id;
  try {
    const producto = await Producto.findByPk(productoId);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    await producto.destroy();
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
};
