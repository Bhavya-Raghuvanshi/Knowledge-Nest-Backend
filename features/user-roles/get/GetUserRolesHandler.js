import UserRoles from "../../../models/UserRoles.js";
import Jwt from "../../../utils/Jwt.js";
import { Pagination } from "../../../utils/Pagination.js";

export default async function GetUserRolesAsync(req, res) {
  try {
    const jwtToken = req.headers.authorization;
    if (!Jwt.isTokenValid(jwtToken)) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    console.log(req.query.pagination);

    const paginationFlag = req.query.pagination === false;

    if (paginationFlag) {
      // Return all records without pagination
      const userRoles = await UserRoles.findAll();
      return res.status(200).json({
        data: userRoles,
      });
    } else {
      // Apply pagination
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 25;

      const pagination = new Pagination(UserRoles, page, limit);
      return await pagination.paginate(req, res);
    }
    // const userRoles = await UserRoles.findAll();

    // return res.status(201).json({
    //   data: userRoles,
    // });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}
