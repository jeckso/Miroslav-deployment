module.exports = (sequelize, DataTypes) => {
  const AlphabetRange = sequelize.define(
    'alphabet_range',
    {
      alphabet_id: DataTypes.INTEGER,
      quantity_property_id: DataTypes.INTEGER,
      min_value: DataTypes.DOUBLE,
      max_value: DataTypes.DOUBLE,
    },
    {
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ['alphabet_id', 'quantity_property_id'],
        },
      ],
    },
  );

  AlphabetRange.associate = models => {
    AlphabetRange.belongsTo(models.alphabet, { foreignKey: 'alphabet_id' });
    AlphabetRange.belongsTo(models.quantity_property, {
      foreignKey: 'quantity_property_id',
    });
  };

  return AlphabetRange;
};
