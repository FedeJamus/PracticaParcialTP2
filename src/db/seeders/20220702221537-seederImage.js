'use strict';
const {randWord, randNumber} = require('@ngneat/falso');

module.exports = {
  async up (queryInterface, Sequelize) {
    let images = []

    for(let i = 0 ;i <5;i++){
      images.push({
        name: randWord(),
        fileId: i+1,
        createdAt: new Date
      })
    }
    await queryInterface.bulkInsert('images', images ,{})
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('images', null, {});
     
  }
};
