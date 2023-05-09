import User, { UserAttributes } from "../models/User";

const userService = {
    findByEmail: async (email: string): Promise<UserAttributes | null> => {
        const user = await User.findOne({ email });
        return user;
      },

      createUser: async (data: UserAttributes): Promise<UserAttributes> => {
        const user = new User(data);
        await user.save()
        return user;
      }
    }

export default userService