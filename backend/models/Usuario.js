module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      id_usuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nombre_usuario: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      celular: {
        type: DataTypes.STRING,
      },
      rol: {
        type: DataTypes.ENUM("estudiante", "dueno_restaurante", "admin"),
        allowNull: false,
      },
      activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      usuario_creacion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      usuario_modificacion: {
        type: DataTypes.STRING,
      },
      fecha_modificacion: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "usuario",
      timestamps: false,
    }
  );

  Usuario.associate = (models) => {
    Usuario.hasOne(models.Estudiante, {
      foreignKey: "id_usuario",
      as: "estudiante",
    });
  };

  return Usuario;
};
