"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('clinics', [
      {
        name: 'Nha Khoa',
        description: 'Với kinh nghiêm 10 năm trong các lĩnh vực Nha Khoa',
        image: 'https://storyset.com/illustration/temperature-measurement/pana#407BFFFF&hide=&hide=complete',
        userID: "23fc1046-8227-4955-a64c-4e97fc8670be",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tâm Lý',
        description: 'Với kinh nghiêm 20 năm trong các lĩnh vực Tâm Lý',
        image: 'https://storyset.com/illustration/headache/bro#407BFFFF&hide=&hide=complete',
        userID: "7fe34001-5b69-4ae0-868c-02f0ebaa1865",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tâm Thần',
        description: 'Với kinh nghiêm 150 năm trong các lĩnh vực Tâm Thần',
        image: 'https://storyset.com/illustration/paranoia/bro#407BFFFF&hide=&hide=complete',
        userID: "87417051-06d9-4592-8cbf-acad5297bd3b",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('clinics', null, {});
  }
};