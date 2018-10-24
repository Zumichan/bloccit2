'use strict';

const faker = require("faker");

let flairs = [];

for(let i = 1 ; i <= 15 ; i++){
   flairs.push({
     name: faker.hacker.noun(),
     color: faker.hacker.phrase(),
     createdAt: new Date(),
     updatedAt: new Date()
   });
 }

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Flairs", flairs, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Flairs", null, {});
  }
};
