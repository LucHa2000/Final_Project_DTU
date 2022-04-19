const express = require("express");
const router = express.Router();
import { getAppandMessage } from "../service/AppoinmentsService";
class DoctorController {
  async index(req, res, next) {
    const doctors = [
      // 20220417230118
      // http://localhost:3000/phong[
      {
        id: "23fc1046-8227-4955-a64c-4e97fc8670be",
        email: "doctor3@gmail.com",
        firstName: "Lucian",
        balance: null,
        lastName: "Lee",
        image: null,
        phoneNumber: "0123211",
        password:
          "$2a$05$o/h/8jCsnVZeQJtGqmsPc.ojVjNYuJRbEHzY5MIL4t6B/OOTemLrS",
        resumeID: null,
        roleID: 2,
        status: 1,
        createdAt: "2022-04-17T08:39:46.000Z",
        updatedAt: "2022-04-17T08:39:46.000Z",
        ResumeId: null,
        RoleId: 2,
        Clinics: [
          {
            id: 2,
            name: "Nha Khoa",
            description: "Doe",
            image: "example@example.com",
            userID: "23fc1046-8227-4955-a64c-4e97fc8670be",
            createdAt: "2022-04-17T08:41:12.000Z",
            updatedAt: "2022-04-17T08:41:12.000Z",
            UserId: "23fc1046-8227-4955-a64c-4e97fc8670be",
          },
        ],
      },
      {
        id: "7fe34001-5b69-4ae0-868c-02f0ebaa1865",
        email: "doctor1@gmail.com",
        firstName: "Threst",
        balance: null,
        lastName: "Lee",
        image: null,
        phoneNumber: "0123211",
        password:
          "$2a$05$AAACdWIttkXeNNvn/AusSeoNSB2BfMMfzO1KbCQpx/eMsYMjDAaC.",
        resumeID: null,
        roleID: 2,
        status: 1,
        createdAt: "2022-04-17T08:39:46.000Z",
        updatedAt: "2022-04-17T08:39:46.000Z",
        ResumeId: null,
        RoleId: 2,
        Clinics: [
          {
            id: 3,
            name: "Tâm Lý",
            description: "Doe",
            image: "example@example.com",
            userID: "7fe34001-5b69-4ae0-868c-02f0ebaa1865",
            createdAt: "2022-04-17T08:41:12.000Z",
            updatedAt: "2022-04-17T08:41:12.000Z",
            UserId: "7fe34001-5b69-4ae0-868c-02f0ebaa1865",
          },
        ],
      },
      {
        id: "87417051-06d9-4592-8cbf-acad5297bd3b",
        email: "doctor@gmail.com",
        firstName: "Mark",
        balance: null,
        lastName: "Lee",
        image: null,
        phoneNumber: "0123211",
        password:
          "$2a$05$QfZ9TiflT6Pi6M2Cx3HQw.uX/rT.A47TwOBhEH6xSl8RHPZN0rhaG",
        resumeID: null,
        roleID: 2,
        status: 1,
        createdAt: "2022-04-17T08:39:46.000Z",
        updatedAt: "2022-04-17T08:39:46.000Z",
        ResumeId: null,
        RoleId: 2,
        Clinics: [
          {
            id: 4,
            name: "Tâm Thần",
            description: "Doe",
            image: "example@example.com",
            userID: "87417051-06d9-4592-8cbf-acad5297bd3b",
            createdAt: "2022-04-17T08:41:12.000Z",
            updatedAt: "2022-04-17T08:41:12.000Z",
            UserId: "87417051-06d9-4592-8cbf-acad5297bd3b",
          },
          {
            id: 5,
            name: "Da Liễu",
            description: "Doe",
            image: "example@example.com",
            userID: "87417051-06d9-4592-8cbf-acad5297bd3b",
            createdAt: "2022-04-17T08:41:12.000Z",
            updatedAt: "2022-04-17T08:41:12.000Z",
            UserId: "87417051-06d9-4592-8cbf-acad5297bd3b",
          },
        ],
      },
    ];
    const list_Test = await getAppandMessage();
    res.render("doctor/home", { doctors: list_Test });
    //res.send(list_Test);
  }
}
module.exports = new DoctorController();
