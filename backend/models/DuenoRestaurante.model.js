module.exports = (sequelize, DataTypes) => {
  const DuenoRestaurante = sequelize.define(
    "DuenoRestaurante",
    {
      id_dueno_restaurante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Usuario",
          key: "id_usuario",
        },
      },
    },
    {
      tableName: "dueno_restaurante",
      timestamps: false,
    }
  );

  return DuenoRestaurante;
};
