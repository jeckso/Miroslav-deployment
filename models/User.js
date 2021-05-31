module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      nickname: DataTypes.STRING,
      password: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
    },
    { timestamps: false },
  );

  return User;
};
