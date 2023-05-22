import bcrypt from "bcrypt";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

class UserService {
  //-----------------------------Create Users---------------------------------------
  async registerUser(userData: any) {
    try {
      const { name, email, password, isAdmin, status } = userData;

      if (!name || !email || !password || !isAdmin) {
        throw new Error("All fields are mandatory!");
      }

      const userAvailable = await User.findOne({ email });
      if (userAvailable) {
        throw new Error("User already registered!");
      }

      const hashedPassword = await bcrypt.hash(password, 5);
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isAdmin,
        status,
      });

      console.log(`User created ${user}`);
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  //-----------------------------Login User---------------------------------------
  async loginUser(userData: any) {
    try {
      const { email, password } = userData;
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
          {
            user: {
              name: user.name,
              email: user.email,
              id: user.id,
            },
          },
          "aaludra",
          { expiresIn: "1m" }
        );

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
        throw new Error("Email or password is not valid");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
export default new UserService();
