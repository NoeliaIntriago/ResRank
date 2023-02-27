module.exports = (sequalize, Sequalize) => {
    const Local = sequalize.define(
        'local',
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
            faculty: {
                type: Sequalize.STRING
            },
            latitude: {
                type: Sequalize.INTEGER
            },
            longitude: {
                type: Sequalize.INTEGER
            },
            score: {
                type: Sequalize.INTEGER
            },
            open_time: {
                type: Sequalize.TIME
            },
            close_time: {
                type: Sequalize.TIME
            }
        },{
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            modelName: 'local',
            tableName: 'local',
        }
    );
    return Local;
};