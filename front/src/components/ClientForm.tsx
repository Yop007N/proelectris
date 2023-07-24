import React, { useState, useEffect, FormEvent } from 'react';
import { getAllClientes, createCliente, updateCliente, deleteCliente } from '../services/api';

interface Client {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
  ruc: string;
  ci: string;
}

const ClientForm: React.FC = () => {
  // Estados para manejar los campos del formulario
  const [nombreCliente, setNombreCliente] = useState<string>('');
  const [direccionCliente, setDireccionCliente] = useState<string>('');
  const [telefonoCliente, setTelefonoCliente] = useState<string>('');
  const [emailCliente, setEmailCliente] = useState<string>('');
  const [rucCliente, setRucCliente] = useState<string>('');
  const [ciCliente, setCiCliente] = useState<string>('');

  // Estados para manejar la búsqueda de clientes
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);

  // Estado para mostrar u ocultar el formulario de agregar cliente
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Estado para guardar temporalmente los datos del cliente que se va a editar
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  // Estado para manejar errores en el formulario
  const [formError, setFormError] = useState<string>('');

  // Función que se ejecuta al cargar el componente, para obtener la lista de clientes
  useEffect(() => {
    fetchClients();
  }, []);

  // Función para obtener todos los clientes desde la API
  const fetchClients = async () => {
    try {
      const clients: Client[] = await getAllClientes();
      setFilteredClients(clients);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  // Función para agregar un nuevo cliente
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar que los campos requeridos no estén vacíos
    if (!nombreCliente || !direccionCliente) {
      setFormError('Los campos Nombre y Dirección son obligatorios.');
      return;
    }

    try {
      const newClient: Omit<Client, 'id'> = {
        nombre: nombreCliente,
        direccion: direccionCliente,
        telefono: telefonoCliente,
        email: emailCliente,
        ruc: rucCliente,
        ci: ciCliente,
      };

      await createCliente(newClient);

      // Actualizar la lista de clientes y limpiar los campos del formulario
      fetchClients();
      setNombreCliente('');
      setDireccionCliente('');
      setTelefonoCliente('');
      setEmailCliente('');
      setRucCliente('');
      setCiCliente('');

      // Ocultar el formulario de agregar cliente y reiniciar el estado de errores
      setShowAddForm(false);
      setFormError('');
    } catch (error) {
      console.error('Error al agregar el cliente:', error);
      setFormError('Ocurrió un error al agregar el cliente.');
    }
  };

  // Función para filtrar la lista de clientes según el término de búsqueda
  const handleSearch = async () => {
    try {
      const clients: Client[] = await getAllClientes();

      if (!clients) {
        // Si no hay clientes, mostrar una lista vacía
        setFilteredClients([]);
        return;
      }

      const filtered: Client[] = clients.filter((client) => {
        const clientNameLowerCase: string = client.nombre ? client.nombre.toLowerCase() : '';
        const searchTermLowerCase: string = searchTerm.toLowerCase();
        return (
          clientNameLowerCase.includes(searchTermLowerCase) ||
          client.ruc.includes(searchTerm) ||
          client.ci.includes(searchTerm)
        );
      });

      setFilteredClients(filtered);
    } catch (error) {
      console.error('Error al obtener los clientes:', error);
    }
  };

  // Función para mostrar el formulario de agregar cliente
  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  // Función para editar un cliente existente
  const handleEditClient = async (id: number) => {
    try {
      // Buscar el cliente en la lista de clientes filtrados
      const clientToEdit = filteredClients.find((client) => client.id === id);

      // Si se encontró el cliente, guardar sus datos en el estado de edición
      if (clientToEdit) {
        setEditingClient(clientToEdit);
        // También puedes establecer los campos del formulario con los datos del cliente a editar
        setNombreCliente(clientToEdit.nombre);
        setDireccionCliente(clientToEdit.direccion);
        setTelefonoCliente(clientToEdit.telefono);
        setEmailCliente(clientToEdit.email);
        setRucCliente(clientToEdit.ruc);
        setCiCliente(clientToEdit.ci);
      }

      // Mostrar el formulario de editar cliente
      setShowAddForm(true);
    } catch (error) {
      console.error('Error al editar el cliente:', error);
    }
  };

  // Función para eliminar un cliente existente
  const handleDeleteClient = async (id: number) => {
    try {
      await deleteCliente(id);

      // Actualizar la lista de clientes
      fetchClients();
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Buscar Cliente:</label>
        <input
          type="text"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="RUC, CI o Nombre del Cliente"
        />
        <button type="button" className="btn btn-primary mt-2" onClick={handleSearch}>
          Buscar
        </button>
      </div>
      {filteredClients.map((client) => (
        <div key={client.id} className="mb-3">
          <p>
            <strong>Nombre del Cliente:</strong> {client.nombre}
          </p>
          <p>
            <strong>Dirección del Cliente:</strong> {client.direccion}
          </p>
          <p>
            <strong>Teléfono del Cliente:</strong> {client.telefono}
          </p>
          <p>
            <strong>Correo Electrónico del Cliente:</strong> {client.email}
          </p>
          <p>
            <strong>RUC del Cliente:</strong> {client.ruc}
          </p>
          <p>
            <strong>CI del Cliente:</strong> {client.ci}
          </p>
          <button className="btn btn-primary" onClick={() => handleEditClient(client.id)}>
            Editar
          </button>
          <button className="btn btn-danger" onClick={() => handleDeleteClient(client.id)}>
            Eliminar
          </button>
        </div>
      ))}
      {!showAddForm && (
        <button className="btn btn-primary" onClick={handleShowAddForm}>
          Agregar Cliente
        </button>
      )}
      {showAddForm && (
        <div>
          <div className="mb-3">
            <label>Nombre del Cliente:</label>
            <input
              type="text"
              className="transparent-input"
              value={nombreCliente}
              onChange={(e) => setNombreCliente(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Dirección del Cliente:</label>
            <input
              type="text"
              className="transparent-input"
              value={direccionCliente}
              onChange={(e) => setDireccionCliente(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Teléfono del Cliente:</label>
            <input
              type="text"
              className="transparent-input"
              value={telefonoCliente}
              onChange={(e) => setTelefonoCliente(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Correo Electrónico del Cliente:</label>
            <input
              type="email"
              className="transparent-input"
              value={emailCliente}
              onChange={(e) => setEmailCliente(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>RUC del Cliente:</label>
            <input
              type="text"
              className="transparent-input"
              value={rucCliente}
              onChange={(e) => setRucCliente(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>CI del Cliente:</label>
            <input
              type="text"
              className="transparent-input"
              value={ciCliente}
              onChange={(e) => setCiCliente(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Agregar Cliente
          </button>
          <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
            Cancelar
          </button>
        </div>
      )}
    </form>
  );
};

export default ClientForm;
