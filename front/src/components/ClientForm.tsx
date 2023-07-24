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
  // Estados para manejar los campos del formulario de agregar cliente
  const [nombreCliente, setNombreCliente] = useState<string>('');
  const [direccionCliente, setDireccionCliente] = useState<string>('');
  const [telefonoCliente, setTelefonoCliente] = useState<string>('');
  const [emailCliente, setEmailCliente] = useState<string>('');
  const [rucCliente, setRucCliente] = useState<string>('');
  const [ciCliente, setCiCliente] = useState<string>('');

  // Estados para manejar los campos del formulario de editar cliente
  const [editNombreCliente, setEditNombreCliente] = useState<string>('');
  const [editDireccionCliente, setEditDireccionCliente] = useState<string>('');
  const [editTelefonoCliente, setEditTelefonoCliente] = useState<string>('');
  const [editEmailCliente, setEditEmailCliente] = useState<string>('');
  const [editRucCliente, setEditRucCliente] = useState<string>('');
  const [editCiCliente, setEditCiCliente] = useState<string>('');

  // Estados para manejar la búsqueda de clientes
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);

  // Estado para mostrar u ocultar el formulario de agregar cliente
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Estado para guardar temporalmente el ID del cliente que se va a editar
  const [editingClientId, setEditingClientId] = useState<number | null>(null);

  // Estado para manejar errores en el formulario
  const [formError, setFormError] = useState<string>('');

  // Estado para mostrar un mensaje de éxito al incluir un cliente
  const [successMessage, setSuccessMessage] = useState<string>('');

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
  const addNewClient = async () => {
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
      resetForm();

      // Mostrar el mensaje de éxito y ocultar el formulario de agregar cliente
      setSuccessMessage('Cliente incluido correctamente.');
      setShowAddForm(false);
      setFormError('');
    } catch (error) {
      console.error('Error al agregar el cliente:', error);
      setFormError('Ocurrió un error al agregar el cliente.');
    }
  };

  // Función para editar un cliente existente
  const editExistingClient = async () => {
    if (!editingClientId) {
      return;
    }

    try {
      const clientToUpdate: Client = {
        id: editingClientId,
        nombre: editNombreCliente,
        direccion: editDireccionCliente,
        telefono: editTelefonoCliente,
        email: editEmailCliente,
        ruc: editRucCliente,
        ci: editCiCliente,
      };

      await updateCliente(editingClientId, clientToUpdate);

      // Actualizar la lista de clientes y limpiar los campos del formulario de edición
      fetchClients();
      resetEditForm();

      // Limpiar el cliente en edición y cancelar el modo de edición
      setEditingClientId(null);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error al editar el cliente:', error);
    }
  };

  // Función para manejar el envío del formulario de agregar cliente
  const handleSubmitAddForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNewClient();
  };

  // Función para manejar el envío del formulario de edición de cliente
  const handleSubmitEditForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editExistingClient();
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
    setFormError('');
    setSuccessMessage(''); // Limpiar el mensaje de éxito al mostrar el formulario
    resetForm();
  };

  // Función para editar un cliente existente
  const handleEditClient = async (id: number) => {
    try {
      // Buscar el cliente en la lista de clientes filtrados
      const clientToEdit = filteredClients.find((client) => client.id === id);

      // Si se encontró el cliente, guardar sus datos en el estado de edición y cambiar al modo de edición
      if (clientToEdit) {
        setEditingClientId(clientToEdit.id);
        setEditNombreCliente(clientToEdit.nombre);
        setEditDireccionCliente(clientToEdit.direccion);
        setEditTelefonoCliente(clientToEdit.telefono);
        setEditEmailCliente(clientToEdit.email);
        setEditRucCliente(clientToEdit.ruc);
        setEditCiCliente(clientToEdit.ci);
        setShowAddForm(true);
        setFormError(''); // Limpiar los errores del formulario
        setSuccessMessage(''); // Limpiar el mensaje de éxito al editar un cliente
      }
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

  // Función para resetear los campos del formulario de agregar cliente
  const resetForm = () => {
    setNombreCliente('');
    setDireccionCliente('');
    setTelefonoCliente('');
    setEmailCliente('');
    setRucCliente('');
    setCiCliente('');
  };

  // Función para resetear los campos del formulario de edición de cliente
  const resetEditForm = () => {
    setEditNombreCliente('');
    setEditDireccionCliente('');
    setEditTelefonoCliente('');
    setEditEmailCliente('');
    setEditRucCliente('');
    setEditCiCliente('');
  };

  return (
    <div>
      {successMessage && <p className="alert alert-success">{successMessage}</p>}

      <form onSubmit={handleSubmitAddForm}>
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
            Incluir Cliente
          </button>
        )}
      </form>

      {showAddForm && (
        <form onSubmit={handleSubmitEditForm}>
          <div className="mb-3">
            <label>Nombre del Cliente:</label>
            <input
              type="text"
              className="transparent-input"
              value={editingClientId ? editNombreCliente : nombreCliente}
              onChange={(e) => (editingClientId ? setEditNombreCliente : setNombreCliente)(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Dirección del Cliente:</label>
            <input
              type="text"
              className="transparent-input"
              value={editingClientId ? editDireccionCliente : direccionCliente}
              onChange={(e) => (editingClientId ? setEditDireccionCliente : setDireccionCliente)(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Teléfono del Cliente:</label>
            <input
              type="text"
              className="transparent-input"
              value={editingClientId ? editTelefonoCliente : telefonoCliente}
              onChange={(e) => (editingClientId ? setEditTelefonoCliente : setTelefonoCliente)(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Correo Electrónico del Cliente:</label>
            <input
              type="email"
              className="transparent-input"
              value={editingClientId ? editEmailCliente : emailCliente}
              onChange={(e) => (editingClientId ? setEditEmailCliente : setEmailCliente)(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>RUC del Cliente:</label>
            <input
              type="text"
              className="transparent-input"
              value={editingClientId ? editRucCliente : rucCliente}
              onChange={(e) => (editingClientId ? setEditRucCliente : setRucCliente)(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>CI del Cliente:</label>
            <input
              type="text"
              className="transparent-input"
              value={editingClientId ? editCiCliente : ciCliente}
              onChange={(e) => (editingClientId ? setEditCiCliente : setCiCliente)(e.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-primary" type="submit">
              {editingClientId ? 'Guardar Cambios' : 'Incluir'}
            </button>
            {editingClientId && (
              <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
                Cancelar Edición
              </button>
            )}
            {!editingClientId && (
              <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ClientForm;
