module.exports = (sequalize, Sequalize) => {
    const UserType = sequalize.define(
        'userType',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequalize.INTEGER
            },
            description: {
                type: Sequalize.STRING
            }
        },
    );
    return UserType;
};