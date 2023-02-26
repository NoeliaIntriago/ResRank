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
                type: Sequalize.STRING
            },
            id_local: {
                type: Sequalize.INTEGER
            },
            id_student: {
                type: Sequalize.INTEGER
            }
        },{
            timestamps: false,
            createdAt: false,
            updatedAt: false,
        }
    );
    return Opinion;
};