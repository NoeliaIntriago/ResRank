const relationSetup = (sequelize) => {
    const { food, local, opinion, owner, student, type, userType } = sequelize.models;
    type.belongsToMany(student, {through: userType, unique: false});
    type.belongsToMany(owner, {through: userType, unique: false});
    local.belongsTo(owner);
    local.hasMany(food);
    local.hasMany(opinion);
    food.belongsTo(local);
    opinion.belongsTo(student);
    student.hasMany(opinion);
}

module.exports = {relationSetup};
