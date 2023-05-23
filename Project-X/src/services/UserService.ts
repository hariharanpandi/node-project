import bcrypt from "bcrypt";
import { User, findByEmail, generateAuthToken } from "../models/user";
import AppConstants from "../utils/appconstants";

const appConstant = new AppConstants();
class UserService {
  //-----------------------------Create Users---------------------------------------
  async registerUser(userData: any) {
    try {
      const { name, email, password, isAdmin, status } = userData;
      if (!name || !email || !password || !isAdmin) {
        throw new Error(appConstant.ERROR_MESSAGES.MANDATORY_FIELD_MISSING);
      }
      const userAvailable = await findByEmail(email);
      if (userAvailable) {
        throw new Error(appConstant.ERROR_MESSAGES.EXISTING_USER);
      }
      const hashedPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin,
        status,
      });
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  //-----------------------------Login User---------------------------------------
  async loginUser(userData: any) {
    try {
      const { email, password } = userData;
      const user = await findByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = generateAuthToken(user);
        return {
          authDetails: {
            accessToken,
          },
          userDetails: {
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status,
          },
        };
      } else {
        throw new Error(appConstant.ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
export default new UserService();
