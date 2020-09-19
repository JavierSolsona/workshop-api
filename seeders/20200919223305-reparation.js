'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Repatarions', [{
      date: '2020-09-19',
      description: 'First Reparation',
      price: "100.00",
      carId: "1",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      date: '2020-09-20',
      description: 'Second Reparation',
      price: "50.00",
      carId: "1",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Repatarions', null, {});
  }
};
