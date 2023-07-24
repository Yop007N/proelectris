import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Cambia esto según la URL de tu API

// Función para obtener todos los productos
export const getAllProductos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/productos`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};

// Función para crear un nuevo producto
export const createProducto = async (productoData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/productos`, productoData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el producto:', error);
    throw error;
  }
};

// Función para actualizar un producto existente
export const updateProducto = async (id: number, productoData: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/productos/${id}`, productoData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    throw error;
  }
};

// Función para eliminar un producto existente
export const deleteProducto = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw error;
  }
};

// Función para obtener todos los clientes
export const getAllClientes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/clientes`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    throw error;
  }
};

// Función para crear un nuevo cliente
export const createCliente = async (clienteData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/clientes`, clienteData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    throw error;
  }
};

// Función para actualizar un cliente existente
export const updateCliente = async (id: number, clienteData: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/clientes/${id}`, clienteData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    throw error;
  }
};

// Función para eliminar un cliente existente
export const deleteCliente = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/clientes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    throw error;
  }
};
