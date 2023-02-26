module.exports = (sequalize, Sequalize) => {
    const Food = sequalize.define(
        'food',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequalize.INTEGER
            },
            price: {
                type: Sequalize.INTEGER
            },
            description: {
                type: Sequalize.STRING
            },
            id_local: {
                type: Sequalize.INTEGER
            }
        },{
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    );
    return Food;
};