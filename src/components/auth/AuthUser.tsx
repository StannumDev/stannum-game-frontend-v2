"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { authUserByToken } from "@/services";
import { achievementHandler } from "@/helpers";

export const AuthUser = () => {
    const token = Cookies.get("token");
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            if (!token) return;
            const { success, achievementsUnlocked, profileStatus } = await authUserByToken(token);
            if (!success) return;
            if (achievementsUnlocked?.length) achievementHandler(achievementsUnlocked);
            if (profileStatus === 'needs_username') {
                router.replace('/register/google');
                return;
            }
            if (profileStatus === 'needs_profile') {
                router.replace('/register/complete-profile');
                return;
            }
        };
        fetchData();
    }, [token, router]);
    return null;
};