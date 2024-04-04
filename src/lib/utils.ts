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
  const currentAccessToken = getAccessToken();
  if (currentAccessToken !== accessToken) {
    localStorage.setItem("accessToken", accessToken)
  }
}

