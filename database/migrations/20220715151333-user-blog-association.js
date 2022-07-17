'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     return queryInterface.addConstraint('blogs',{
      fields: ['userId'],
      type: 'foreign key',
      name: 'user-blog-association',
      references: {
        table: 'users',
        field: 'id'
      }
    })
  },

  async down (queryInterface, Sequelize) {
     return queryInterface.removeConstraint('blogs',{
      fields: ['userId'],
      type: 'foreign key',
      name: 'user-blog-association',
      references: {
        table: 'users',
        field: 'id'
      }
    })
  }
};
