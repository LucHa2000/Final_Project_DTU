"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("resumes", [
      {
        id: uuidv4(),
        starNo: 5,
        title: "Tiến sĩ Tâm lý - Giáo dục Nguyễn Thắm",
        description:
          "5 năm làm việc tại Trung tâm phụ nữ và phát triển: Hỗ trợ đánh giá tâm lý, tham vấn và trị liệu tâm lý cho phụ nữ và trẻ em bị bạo lực gia đình, xâm hại tình dục, trẻ em có những rối nhiễu, sang chấn tâm lýHơn 15 năm giảng dạy cho sinh viên, học viên các lớp về các chủ đề liên quan đến giáo dục kĩ năng sống, đánh giá và trị liệu, can thiệp cho trẻ em có nhu cầu đặc biệt, trẻ em có sang chấn, rối nhiều tâm lý tại các Trường Đại học, Cao đẳngChuyên gia hỗ trợ cho Trung tâm nghiên cứu và ứng dụng tâm lý – giáo dục  ở Hà Nội, Hải Phòng, Quảng Ninh, Thái Bình,… về lĩnh vực can thiệp, trị liệu tâm lý, tư vấn phụ huynh, đánh giá tâm lý các rối loạn phát triển cho trẻ em; lên chương trình và giảng dạy các lớp kĩ năng sống cho trẻ em Chuyên gia tâm lý cấp cao cho phòng tham vấn học đường của các trường công lập và tư thục trên địa bàn Hà Nội: Đánh giá vấn đề tâm lý của HS, lên kế hoạch can thiệp và trực tiếp trị liệu cho HS trầm cảm, lo âu, tăng động giảm tập trung, tự kỉ, nghiện game và các chất kích thích, bạo lực học đường, xâm hại tình dục,….",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("resumes", null, {});
  },
};
