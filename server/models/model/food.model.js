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
            }
        },{
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            modelName: 'food',
            tableName: 'food',
        }
    );
    return Food;
};