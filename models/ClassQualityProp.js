module.exports = (sequelize, DataTypes) => {
  const ClassQualityProp = sequelize.define(
    'classes_quality_property',
    {
      class_id: DataTypes.INTEGER,
      property_value: DataTypes.STRING,
      quality_property_id: DataTypes.INTEGER,
    },
    { timestamps: false },
  );

  ClassQualityProp.associate = models => {
    ClassQualityProp.belongsTo(models.class, { foreignKey: 'class_id' });
    ClassQualityProp.belongsTo(models.quality_property, {
      foreignKey: 'quality_property_id',
    });
  };

  return ClassQualityProp;
};
