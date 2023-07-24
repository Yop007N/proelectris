"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Cliente extends sequelize_1.Model {
}
Cliente.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING(20),
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
    },
    ruc: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    ci: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'cliente',
});
exports.default = Cliente;
