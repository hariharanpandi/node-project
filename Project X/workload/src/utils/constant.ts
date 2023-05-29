export default class AppConstants {
  URL = {
    BASE_URL: "/projectx",
  };

  TOKEN = {
    PERFIX_TOKEN: "Bearer",
  };

  SCHEMA = {
    STATUS_ACTIVE: "Active",
    STATUS_INACTIVE: "Inactive",
    USERS_COLLEECTION_NAME: "register_users",
    PROJECT_USERS_COLLEECTION_NAME: "project_user",
    TOKEN_EXPIRE_TIME: "20m",
  };

  MESSAGES = {
    EMPTY_TOKEN: "Token was not provided",
    UNAUTHORIZED_USER: "User is not authorized",
    INVALID_TOKEN: "Invalid token",
    PORT_LISTEN: "Server running on port ",
  };

  DBCONNECTION = {
    SUCCESSFUL: "Connected to MongoDB",
    UNSUCCESSFUL: "MongoDB connection error",
  };

  ERROR_MESSAGES = {
    EXISTING_USER: "User already registered!",
    MANDATORY_FIELD_MISSING: "All fields are mandatory!",
    DUPLICATE: "Duplicate records found"
  };

}
