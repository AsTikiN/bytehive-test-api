import bcrypt from "bcryptjs";

export const SALT = 10;

export const hashPassword = async (password: string) => await bcrypt.hash(password, SALT);
