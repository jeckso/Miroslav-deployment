module.exports = (sequelize, DataTypes) => {
  const QualityProp = sequelize.define(
    "quality_property",
    {
      name: DataTypes.STRING,
      sign: DataTypes.STRING
    },
    { timestamps: false }
  );

  return QualityProp;
};
