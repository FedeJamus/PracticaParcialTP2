'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  let users_files = []
  
  users_files.push({
          userId: 1,
          fileId: 1,
          createdAt: new Date
        },
        {
        userId: 1,
        fileId: 2,
        createdAt: new Date
        },
        {
        userId: 1,
        fileId: 3,
        createdAt: new Date
        },
        {
        userId: 1,
        fileId: 4,
        createdAt: new Date
        },
        {
        userId: 1,
        fileId: 5,
        createdAt: new Date
        },
        {
        userId: 2,
        fileId: 6,
        createdAt: new Date
        },
        {
        userId: 2,
        fileId: 7,
        createdAt: new Date
        })
        
      await queryInterface.bulkInsert('users_files', users_files ,{})
  },

  async down (queryInterface, Sequelize) {
   
     await queryInterface.bulkDelete('users_files', null, {});
     
  }
};