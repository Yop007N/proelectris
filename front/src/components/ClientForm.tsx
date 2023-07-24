import React, { useState, useEffect, FormEvent } from 'react';
import { getAllClientes, createCliente, updateCliente, deleteCliente } from '../services/api';

interface Client {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  ruc: string;
  ci: string;
}

const ClientForm: React.FC = () => {
  // Estados para manejar los campos del formulario
  const [clientName, setClientName] = useState<string>('');
  const [clientAddress, setClientAddress] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientRUC, setClientRUC] = useState<string>('');
  const [clientCI, setClientCI] = useState<string>('');

  // Estados para manejar la búsqueda de clientes
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);

  // Estado para mostrar u ocultar el formulario de agregar cliente
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

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
    if (!clientName || !clientAddress) {
      setFormError('Los campos Nombre y Dirección son obligatorios.');
      return;
    }

    try {
      const newClient: Omit<Client, 'id'> = {
        name: clientName,
        address: clientAddress,
        phone: clientPhone,
        email: clientEmail,
        ruc: clientRUC,
        ci: clientCI,
      };

      await createCliente(newClient);

      // Actualizar la lista de clientes y limpiar los campos del formulario
      fetchClients();
      setClientName('');
      setClientAddress('');
      setClientPhone('');
      setClientEmail('');
      setClientRUC('');
      setClientCI('');

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
        const clientNameLowerCase: string = client.name ? client.name.toLowerCase() : '';
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
      const clientToUpdate: Client = {
        id: id,
        name: clientName,
        address: clientAddress,
        phone: clientPhone,
        email: clientEmail,
        ruc: clientRUC,
        ci: clientCI,
      };

      await updateCliente(id, clientToUpdate);

      // Actualizar la lista de clientes y limpiar los campos del formulario
      fetchClients();
      setClientName('');
      setClientAddress('');
      setClientPhone('');
      setClientEmail('');
      setClientRUC('');
      setClientCI('');

      // Ocultar el formulario de agregar cliente
      setShowAddForm(false);
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
            <strong>Nombre del Cliente:</strong> {client.name}
          </p>
          <p>
            <strong>Dirección del Cliente:</strong> {client.address}
          </p>
          <p>
            <strong>Teléfono del Cliente:</strong> {client.phone}
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
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Dirección del Cliente:</label>
            <input
              type="text"
              className="transparent-input"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Teléfono del Cliente:</label>
            <input
              type="text"
              className="transparent-input"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Correo Electrónico del Cliente:</label>
            <input
              type="email"
              className="transparent-input"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>RUC del Cliente:</label>
            <input
              type="text"
              className="transparent-input"
              value={clientRUC}
              onChange={(e) => setClientRUC(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>CI del Cliente:</label>
            <input
              type="text"
              className="transparent-input"
              value={clientCI}
              onChange={(e) => setClientCI(e.target.value)}
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
