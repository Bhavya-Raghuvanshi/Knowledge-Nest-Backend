import express from "express";
import AddUserProfileAsync from "../features/users-profile/add/AddUserProfileHandler.js";
import GetByIdUserProfileAsync from "../features/users-profile/get/GetByIdUserProfile.js";

const router = express.Router();

router.post("/add", AddUserProfileAsync);
router.get("/getbyid/:id", GetByIdUserProfileAsync);

export default router;
