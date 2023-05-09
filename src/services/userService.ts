import User, { UserAttributes } from "../models/user";

const userService = {
    findByEmail: async (email: string): Promise<UserAttributes | null> => {
        const user = await User.findOne({ email });
        return user;
      },

      createUser: async (data: UserAttributes): Promise<UserAttributes> => {
        const user = new User(data);
        console.log(user)
        await user.save()
        return user;
      }
    }

export default userService