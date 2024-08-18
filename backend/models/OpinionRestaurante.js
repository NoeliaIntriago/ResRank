module.exports = (sequelize, DataTypes) => {
  const OpinionRestaurante = sequelize.define(
    "OpinionRestaurante",
    {
      id_opinion: {
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
      id_bar: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Bar",
          key: "id_bar",
        },
      },
      comentario: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: "opinion_restaurante",
      timestamps: false,
    }
  );

  return OpinionRestaurante;
};
