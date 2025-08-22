"use client"

import { useEffect } from "react";
import Cookies from "js-cookie";
import { authUserByToken } from "@/services";

export const AuthUser = () => {
    const token = Cookies.get("token");
    useEffect(() => {
        authUserByToken(token);
    }, [token]);
    return null;
}
