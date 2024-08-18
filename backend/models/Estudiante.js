module.exports = (sequelize, DataTypes) => {
  const Estudiante = sequelize.define(
    "Estudiante",
    {
      id_estudiante: {
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
      matricula: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagen_matricula: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "estudiante",
      timestamps: false,
    }
  );

  return Estudiante;
};
