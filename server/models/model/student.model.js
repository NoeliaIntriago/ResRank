module.exports = (sequalize, Sequalize) => {
    const Student = sequalize.define(
        'student',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequalize.INTEGER
            },
            name: {
                type: Sequalize.STRING
            },
            lastName: {
                type: Sequalize.STRING
            },
            email: {
                type: Sequalize.STRING
            },
            password: {
                type: Sequalize.STRING
            },
            career: {
                type: Sequalize.STRING
            },
            userType: {
                type: Sequalize.INTEGER
            }
        },{
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            modelName: 'student',
            tableName: 'student',
        }
    );
    return Student;
};