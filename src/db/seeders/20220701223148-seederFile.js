'use strict';
const {randWord, randNumber} = require('@ngneat/falso');

module.exports = {
  async up (queryInterface, Sequelize) {
    let files = []

    for(let i = 0 ;i <5;i++){
      files.push({
        title: randWord(),
        folderId: randNumber({min:1,max:3}),
        createdAt: new Date
      })
    }
    await queryInterface.bulkInsert('files', files ,{})
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('files', null, {});
     
  }
};
