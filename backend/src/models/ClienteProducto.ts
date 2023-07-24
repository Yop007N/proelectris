import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Asegúrate de que la ruta sea correcta según la ubicación de tu archivo db.ts

class ClienteProducto extends Model {
  public id!: number;
  public cliente_id!: number;
  public producto_id!: number;
}

ClienteProducto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'cliente_producto',
  }
);

export default ClienteProducto;
