module.exports = (sequalize, Sequalize) => {
    const Opinion = sequalize.define(
        'opinion',
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequalize.INTEGER
            },
            score: {
                type: Sequalize.INTEGER
            },
            details: {
                type: Sequalize.TEXT('long')
            }
        },{
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            modelName: 'opinion',
            tableName: 'opinion',
        }
    );
    return Opinion;
};