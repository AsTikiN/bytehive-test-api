import { generateToken } from "../../lib/tokens";
import { UserModel } from "../../models/User";
import * as UserService from "../User"
import bcrypt from "bcryptjs";

export const registerUser = async (userData: Partial<UserModel>) => {
    let user = await UserService.getUserByQuery({ email: userData.email });
    if(user) throw new Error("User already registered") 

    user = await UserService.createUser(userData);

    const token = generateToken({ id: user.id }, "30d");

    return { token };
};

export const loginUser = async (email: string, password: string) => {
    const user = await UserService.getUserByQuery({ email });

    if (!user) throw new Error("Email not registered");

    const isValidPassword = bcrypt.compareSync(password, user.password)

    if(!isValidPassword) throw new Error("Incorrect password")

    const token = generateToken({ id: user.id }, "30d");

    return { token };
};
