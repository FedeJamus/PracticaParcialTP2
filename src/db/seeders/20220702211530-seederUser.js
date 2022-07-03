'use strict';
const {randWord, randNumber} = require('@ngneat/falso');

module.exports = {
  async up (queryInterface, Sequelize) {
    let users = [];
    users.push({
      name: "fede",
      surname: "jamus",
      type: 1,
      createdAt: new Date
    },
    {
      name: "fonso",
      surname: "algo",
      type: 2,
      createdAt: new Date
    },
    {
      name: "tom",
      surname: "climent",
      type: 3,
      createdAt: new Date
    })
    await queryInterface.bulkInsert('users',users,{})
     
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
