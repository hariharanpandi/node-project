export default class AppConstants {
  URL = {
    BASE_URL: "/projectx",
  };

  TOKEN = {
    PERFIX_TOKEN: "Bearer",
  };

  SCHEMA = {
    STATUS_ACTIVE: "ACTIVE",
    STATUS_INACTIVE: "InActive",
    USERS_COLLEECTION_NAME: "users",
    TOKEN_EXPIRE_TIME: "20m",
  };

  MESSAGES = {
    EMPTY_TOKEN: "Token was not provides",
    UNAUTHORIZED_USER: "User is not authorized",
    INVALID_TOKEN: "Invalid token",
    PORT_LISTEN: "Listening on port",
  };
  DBCONNECTION = {
    SUCCESSFUL: "Connected to MongoDB",
    UNSUCCESSFUL: "MongoDB connection error",
  };
  ERROR_MESSAGES = {
    INVALID_EMAIL_OR_PASSWORD: "Email or password is not valid",
    EXISTING_USER: "User already registered!",
    MANDATORY_FIELD_MISSING: "All fields are mandatory!",
  };
}
