import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "../Auth/tokens";

export default function getUserData() {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
