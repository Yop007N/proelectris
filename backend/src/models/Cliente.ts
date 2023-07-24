import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Cliente extends Model {
  public id!: number;
  public nombre!: string;
  public direccion!: string;
  public telefono?: string;
  public email?: string;
  public ruc!: string;
  public ci!: string;
}

Cliente.init(
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
    direccion: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(20),
    },
    email: {
      type: DataTypes.STRING(100),
    },
    ruc: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    ci: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'cliente',
  }
);

export default Cliente;
