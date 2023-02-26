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
            id_user: {
                type: Sequalize.STRING
            },
            id_type: {
                type: Sequalize.STRING
            }
        },{
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    );
    return UserType;
};