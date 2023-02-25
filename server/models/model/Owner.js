module.exports = (sequalize, Sequalize) => {
    const Owner = sequalize.define(
        'owner',
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
            cellphone: {
                type: Sequalize.STRING
            },
            email: {
                type: Sequalize.STRING
            },
            password: {
                type: Sequalize.STRING
            },
            user_type: {
                type: Sequalize.INTEGER
            }
        },
    );
    return Owner;
};