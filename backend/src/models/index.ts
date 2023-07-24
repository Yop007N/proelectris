import Cliente from './Cliente';
import Producto from './Producto';
import ClienteProducto from './ClienteProducto';

// Aquí definimos las relaciones entre los modelos si existen
// Por ejemplo, si un cliente puede tener varios productos asociados (relación 1:N)
Cliente.hasMany(ClienteProducto, { foreignKey: 'cliente_id', as: 'productos' });
// Y si un producto puede pertenecer a varios clientes (relación N:M)
Producto.belongsToMany(Cliente, { through: ClienteProducto, foreignKey: 'producto_id', as: 'clientes' });

export { Cliente, Producto, ClienteProducto };
