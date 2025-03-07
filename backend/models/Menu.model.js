module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "Menu",
    {
      id_menu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_bar: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Bar",
          key: "id_bar",
        },
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      precio: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      imagen: {
        type: DataTypes.STRING,
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
      tableName: "menu",
      timestamps: false,
    }
  );

  return Menu;
};
