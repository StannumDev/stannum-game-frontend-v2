"use client"

import { useEffect } from "react";
import Cookies from "js-cookie";
import { authUserByToken } from "@/services";
import { achievementHandler } from "@/helpers";

export const AuthUser = () => {
    const token = Cookies.get("token");
    useEffect(() => {
        const fetchData = async () => {
            const { achievementsUnlocked } = await authUserByToken(token);
            achievementsUnlocked && achievementHandler(achievementsUnlocked);
        }
        fetchData();
    }, [token]);
    return null;
}
