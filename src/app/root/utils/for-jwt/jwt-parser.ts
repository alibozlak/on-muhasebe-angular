import { jwtDecode } from "jwt-decode";
import { jwtTokenKeyNameInLocalStorage } from "../project-constants";
import { PayloadJson } from "./payload-json";

export function getDecodedToken() {
    const jwtToken : string = localStorage.getItem(jwtTokenKeyNameInLocalStorage)!;

    if (!jwtToken)
        return null;

    try {
        return jwtDecode<PayloadJson>(jwtToken);
    } catch (error){
        console.error("Token formati geçersiz veya çözümlenemedi:", error);
        return null;
    }
}

export function getAdminId() {
    const decodedToken = getDecodedToken();

    return decodedToken?.adminId ?? null;
}

export function getUserId() {
    const decodedToken = getDecodedToken();

    return decodedToken?.userId ?? null;
}