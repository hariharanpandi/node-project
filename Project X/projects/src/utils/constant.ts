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
    TOKEN_EXPIRE_TIME: "20m",
    PROJECT_COLLEECTION_NAME: "projects",
  };

  MESSAGES = {
    EMPTY_TOKEN: "Token was not provided",
    UNAUTHORIZED_USER: "User is not authorized",
    INVALID_TOKEN: "Invalid token",
    PORT_LISTEN: "Server running on port ",
    DELETE_PROJECT: "project deleted successfully",
    PROJECT_NOT_FOUND: "project not found",
  };

  DBCONNECTION = {
    SUCCESSFUL: "Connected to MongoDB",
    UNSUCCESSFUL: "MongoDB connection error",
  };

  ERROR_MESSAGES = {
    INVALID_EMAIL_OR_PASSWORD: "Email or password is not valid",
    EXISTING_USER: "User already registered!",
    MANDATORY_FIELD_MISSING: "All fields are mandatory!",
    DUPLICATE: "project name already exists"
  };

}