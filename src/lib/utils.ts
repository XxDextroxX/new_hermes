import { UserModel } from "@/models/user_model"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function saveAccessToken(accessToken: string) {
  localStorage.setItem("accessToken", accessToken)
}

export function getAccessToken() {
  return localStorage.getItem("accessToken")
}

export function updateAccessToken(accessToken: string) {
  console.log(`token update: ${accessToken}`);
  // localStorage.setItem("accessToken", accessToken)
  const currentAccessToken = getAccessToken();
  console.log(`currentAccessToken: ${currentAccessToken === accessToken}`);
  if (currentAccessToken !== accessToken) {
    console.log('Saving new token');
    localStorage.setItem("accessToken", accessToken)
  }
}

export function saveUserModel(user: UserModel) {
  localStorage.setItem("user", JSON.stringify(user.toJson()));
}

export function getUserModel(): UserModel | null {
  const userJson = localStorage.getItem("user");
  return userJson ? new UserModel().fromJson(JSON.parse(userJson)) : null;
}

//delete user
export function deleteUser() {
  localStorage.removeItem("user");
}



