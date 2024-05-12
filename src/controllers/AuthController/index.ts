import { Response } from "express";

import * as AuthService from "../../services/Auth";

import { AuthRequest } from "../../types/AuthRequest";
import { hashPassword } from "../../lib/hashPassword";

export const registerUser = async (req: AuthRequest, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const { token } = await AuthService.registerUser({
      firstName,
      lastName,
      email,
      password: await hashPassword(password),
    });

    res.status(201).json({ token });
  } catch (error: any) {
    res
      .status(500)
      .json({
        error: error.message || "Error occurred while registering user",
      });
  }
};

export const loginUserController = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const { token } = await AuthService.loginUser(email, password);

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error occurred while logging in" });
  }
};
