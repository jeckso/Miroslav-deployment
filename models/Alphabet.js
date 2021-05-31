module.exports = (sequelize, DataTypes) => {
  const Alphabet = sequelize.define(
    "alphabet",
    {
      name: DataTypes.STRING
    },
    { timestamps: false }
  );

  Alphabet.associate = models => {
    Alphabet.hasMany(models.class, { foreignKey: "alphabet_id" });
  };

  return Alphabet;
};
