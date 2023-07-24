import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Producto extends Model {
  public id!: number;
  public nombre!: string;
  public descripcion?: string;
  public codigo!: string;
  public precio!: number;
}

Producto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    codigo: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'producto',
  }
);

export default Producto;
