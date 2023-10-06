import { StateSchema } from "app/providers";
import { LoginSchema } from "../../types/LoginSchema";

export const getLoginState = (state: StateSchema) => state?.loginForm