module.exports = (sequelize, DataTypes) => {
  const Administrador = sequelize.define(
    "Administrador",
    {
      id_administrador: {
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
      tableName: "administrador",
      timestamps: false,
    }
  );

  return Administrador;
};
