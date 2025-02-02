import {
  DataTypes,
  Model,
  CreationOptional,
} from 'sequelize';
import db from '.';

class TeamsModel extends Model {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

TeamsModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
    field: 'team_name',
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

export default TeamsModel;
