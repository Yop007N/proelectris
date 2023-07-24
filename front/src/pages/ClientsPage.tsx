import React from 'react';
import ClientForm from '../components/ClientForm';

const ClientsPage: React.FC = () => {
  return (
    <div className="container text-white"> {/* Agregamos la clase 'text-white' para que el texto sea de color blanco */}
      <h2 className="text-white">Página de Clientes</h2>
      <ClientForm />
      {/* Aquí puedes mostrar la lista de clientes y agregar funcionalidades adicionales */}
    </div>
  );
}

export default ClientsPage;
