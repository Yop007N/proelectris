"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConnection = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('proelectris', 'postgres', '1346', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
});
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa');
    }
    catch (error) {
        console.error('Error de conexión:', error);
    }
};
exports.testConnection = testConnection;
exports.default = sequelize;
