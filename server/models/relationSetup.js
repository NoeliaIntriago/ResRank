const relationSetup = (sequelize) => {
    const { food, local, opinion, owner, student } = sequelize.models;
  
    local.belongsTo(owner);
    local.hasMany(food);
    local.hasMany(opinion);
    food.belongsTo(local);
    opinion.belongsTo(student);
    student.hasMany(opinion);
    
}

module.exports = {relationSetup};
