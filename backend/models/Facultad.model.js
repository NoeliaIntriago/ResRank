module.exports = (sequelize, DataTypes) => {
  const Facultad = sequelize.define(
    "Facultad",
    {
      id_facultad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitud: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
      },
      longitud: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      tableName: "facultad",
      timestamps: false,
    }
  );

  Facultad.associate = (models) => {
    Facultad.hasMany(models.Bar, {
      foreignKey: "id_facultad",
      as: "restaurants",
    });
  };

  return Facultad;
};
