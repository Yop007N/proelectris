"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteProducto = exports.Producto = exports.Cliente = void 0;
const Cliente_1 = __importDefault(require("./Cliente"));
exports.Cliente = Cliente_1.default;
const Producto_1 = __importDefault(require("./Producto"));
exports.Producto = Producto_1.default;
const ClienteProducto_1 = __importDefault(require("./ClienteProducto"));
exports.ClienteProducto = ClienteProducto_1.default;
// Aquí definimos las relaciones entre los modelos si existen
// Por ejemplo, si un cliente puede tener varios productos asociados (relación 1:N)
Cliente_1.default.hasMany(ClienteProducto_1.default, { foreignKey: 'cliente_id', as: 'productos' });
// Y si un producto puede pertenecer a varios clientes (relación N:M)
Producto_1.default.belongsToMany(Cliente_1.default, { through: ClienteProducto_1.default, foreignKey: 'producto_id', as: 'clientes' });
