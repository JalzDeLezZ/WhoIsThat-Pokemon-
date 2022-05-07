const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    pok_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    pok_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    pok_life: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pok_attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pok_defense: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pok_speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pok_height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pok_weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pok_image: {
      type: DataTypes.STRING,
      defaultValue: 'https://i.ibb.co/qR3Zq3M/pokemon.png',
      allowNull: true,
    },
  },
  { timestamps: false }
  );
};
