module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  }, {
    classMethods: {
      associate() {
        // associations can be defined here
      },
    },
  });
  return users;
};
