module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define(
    "unit",
    {
      name: DataTypes.STRING
    },
    { timestamps: false }
  );

  Unit.associate = models => {
    Unit.hasMany(models.quantity_propertiy_unit, {
      foreignKey: "unit_id"
    });
  };

  return Unit;
};
