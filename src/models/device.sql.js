import { sequelize } from '@/database/prisma';
import { DataTypes, Model } from '@sequelize/core';

class Device extends Model { }

Device.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serviceTag: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'Device',
    tableName: 'devices',
  }
);

export default Device;
