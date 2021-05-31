module.exports = (sequelize, DataTypes) => {
  const QuantityPropUnit = sequelize.define(
    "quantity_propertiy_unit",
    {
      quantity_property_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      unit_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      }
    },
    { timestamps: false, freezeTableName: true }
  );

  QuantityPropUnit.associate = models => {
    QuantityPropUnit.belongsTo(models.quantity_property, {
      foreignKey: "quantity_property_id"
    });
    QuantityPropUnit.belongsTo(models.unit, {
      foreignKey: "quantity_property_id"
    });
  };

  return QuantityPropUnit;
};
