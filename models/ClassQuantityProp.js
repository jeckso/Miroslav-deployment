module.exports = (sequelize, DataTypes) => {
  const ClassQuantityProp = sequelize.define(
    'classes_quantity_property',
    {
      class_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      quantity_property_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      values: DataTypes.ARRAY(DataTypes.STRING),
    },
    { timestamps: false },
  );

  ClassQuantityProp.associate = models => {
    ClassQuantityProp.belongsTo(models.alphabet_range, {
      foreignKey: 'quantity_property_id',
    });
    ClassQuantityProp.belongsTo(models.class, { foreignKey: 'class_id' });
  };

  return ClassQuantityProp;
};
