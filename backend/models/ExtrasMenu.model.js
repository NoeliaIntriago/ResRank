module.exports = (sequelize, DataTypes) => {
  const ExtrasMenu = sequelize.define(
    "ExtrasMenu",
    {
      id_extra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_menu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Menu",
          key: "id_menu",
        },
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "extras_menu",
      timestamps: false,
    }
  );

  return ExtrasMenu;
};
