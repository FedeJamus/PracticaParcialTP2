'use strict';
const {randWord, randNumber} = require('@ngneat/falso');

module.exports = {
  async up (queryInterface, Sequelize) {
    let folders = []

    for(let i = 0 ;i <5;i++){
      folders.push({
        name: randWord(),
        userId: 1,
        createdAt: new Date
      })
    }
     await queryInterface.bulkInsert('folders',folders,{})
  },
  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('folders', null, {});
     
  }
};
