module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define(
    "class",
    {
      name: DataTypes.STRING,
      alphabet_id: DataTypes.INTEGER
    },
    { timestamps: false }
  );

  Class.associate = models => {
    Class.belongsTo(models.alphabet, { foreignKey: "alphabet_id" });
  };

  return Class;
};
