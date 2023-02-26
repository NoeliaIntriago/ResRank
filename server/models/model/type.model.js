module.exports = (sequalize, Sequalize) => {
    const Type = sequalize.define(
        'type',
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
        },{
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    );
    return Type;
};