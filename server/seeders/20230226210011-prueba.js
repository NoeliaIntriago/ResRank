'use strict';
const dummyData = require('../dummyData/data');
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('owner', dummyData.owner, {});
    await queryInterface.bulkInsert('student', dummyData.student, {});
    await queryInterface.bulkInsert('local', dummyData.local, {});
    await queryInterface.bulkInsert('food', dummyData.food, {});
    await queryInterface.bulkInsert('opinion', dummyData.opinion, {});
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
