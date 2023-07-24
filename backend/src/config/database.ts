
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('proelectris', 'postgres', '1346', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa');
  } catch (error) {
    console.error('Error de conexión:', error);
  }
};

export { testConnection };

export default sequelize;
