module.exports = (sequelize, DataTypes) => {
  const QuantityProp = sequelize.define(
    "quantity_property",
    {
      name: DataTypes.STRING,
      sign: DataTypes.STRING
    },
    { timestamps: false }
  );

  QuantityProp.associate = models => {
    QuantityProp.hasOne(models.quantity_propertiy_unit, {
      foreignKey: "quantity_property_id"
    });
  };

  return QuantityProp;
};
