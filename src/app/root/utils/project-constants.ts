import { getAdminId } from "./for-jwt/jwt-parser";

export const baseApiUrl = "http://localhost:8080/api";

export const jwtTokenKeyNameInLocalStorage = "jwtToken";

export const isUserAdmin = () : boolean => {
    const adminId : number | null = getAdminId();
    return (adminId && adminId != null && adminId > 0) ? true : false;
}