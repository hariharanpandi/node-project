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
    USERS_COLLECTION_NAME: "users",
    TENANT_COLLECTION_NAME: "tenant",
    TENANT_GROUP_COLLECTION: "tenant_group",
    TOKEN_EXPIRE_TIME: "20m",
  };

  MESSAGES = {
    EMPTY_TOKEN: "Token was not provided",
    UNAUTHORIZED_USER: "User is not authorized",
    INVALID_TOKEN: "Invalid token",
    PORT_LISTEN: "Server running on port ",
    DELETE_USER: "user deleted successfully",
    TENANT_DELETED: "Tenant deleted successfully",
    OR: " (or) ",
    EMPTY_SPACE: " ",
    PASSWORD: "password"
  };

  DBCONNECTION = {
    SUCCESSFUL: "Connected to MongoDB",
    UNSUCCESSFUL: "MongoDB connection error",
  };

  ERROR_MESSAGES = {
    INVALID_EMAIL_OR_PASSWORD: "Email or password is not valid",
    EXISTING_USER: "User already registered!",
    EXISTING_TENANT: "Tenant already registered!",
    MANDATORY_FIELD_MISSING: "All fields are mandatory!",
    DUPLICATE: "Duplicate records found",
    USER_INACTIVE: "User has been expired",
    TENANT_INACTIVE: "Tenant has been expired",
    USER_NOT_FOUND: "User not found",
    TENANT_NOT_FOUND: "Tenant not found",
    TENANT_NOT_FOUND_EXPIRED: "Tenant has been expired or Tenant not found",
    TENANT_USER_NOT_FOUND: "Tenant or user unavailable"
  };

}
