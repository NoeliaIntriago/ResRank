module.exports = (sequelize, DataTypes) => {
  const Bar = sequelize.define(
    "Bar",
    {
      id_bar: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_dueno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Usuario",
          key: "id_usuario",
        },
      },
      id_facultad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Facultad",
          key: "id_facultad",
        },
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      horario_inicio: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      horario_fin: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      tipo_menu: {
        type: DataTypes.ENUM("piqueo", "desayuno", "almuerzo"),
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
      tableName: "bar",
      timestamps: false,
    }
  );

  Bar.associate = (models) => {
    Bar.belongsTo(models.Usuario, {
      foreignKey: "id_dueno",
      as: "dueno",
    });
    Bar.belongsTo(models.Facultad, {
      foreignKey: "id_facultad",
      as: "facultad",
    });
    Bar.hasMany(models.Menu, {
      foreignKey: "id_bar",
      as: "menus",
      onDelete: "CASCADE",
    });
  }

  return Bar;
};
