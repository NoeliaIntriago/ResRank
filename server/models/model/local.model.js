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
                type: Sequalize.FLOAT
            },
            longitude: {
                type: Sequalize.FLOAT
            },
            score: {
                type: Sequalize.FLOAT,
                defaultValue: 0
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