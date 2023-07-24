import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientsPage from './pages/ClientsPage';
import './App.css';

function App() {
  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <Router>
      <div className="background-image">
        <div className="container text-white">
          <div className="row">
            <div className="col">
              <h1 className="text-white"> </h1>
            </div>
            <div className="col">
              <div className="btn-group" role="group">
                <button className="btn btn-primary" onClick={() => handleNavigation('/productos')}>
                  Productos
                </button>
                <button className="btn btn-primary" onClick={() => handleNavigation('/clientes')}>
                  Clientes
                </button>
                <button className="btn btn-primary" onClick={() => handleNavigation('/presupuestos')}>
                  Presupuestos
                </button>
              </div>
            </div>
          </div>
          <Routes>
            <Route path="/clientes" element={<ClientsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
