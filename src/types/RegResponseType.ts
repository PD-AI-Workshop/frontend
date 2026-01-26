import { RegisterFormType } from "./FormTypes";

export type RegResponseType = Omit<RegisterFormType, 'confirmPassword'> & { role: string }
