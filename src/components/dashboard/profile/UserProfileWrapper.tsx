'use client'

import { Fragment, useCallback, useEffect, useState } from "react";
import { getUserDetailsByUsername } from "@/services";
import { errorHandler } from "@/helpers";
import { AppError, FullUserDetails } from "@/interfaces";
import { UserProfileDetails, ProfileSectionsLayout, LoadingScreen } from "@/components";

interface Props{
    username: string;
}

export const UserProfileWrapper = ({username}:Props) => {
    
    const [userData, setUserData] = useState<FullUserDetails|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchUserData = useCallback( async () => {
        setIsLoading(true);
        try {
            setUserData(await getUserDetailsByUsername(username));
        } catch (error) {
            const appError:AppError = errorHandler(error);
            console.error(appError);
        } finally {
            setIsLoading(false);
        }
    }, [username]);

    useEffect(() => {
        fetchUserData();
    }, [username, fetchUserData]);

    if(!userData || isLoading){
        return (
            <LoadingScreen/>
        )
    }

    return (
        <Fragment>
            <UserProfileDetails user={userData} fetchUserData={fetchUserData}/>
            <ProfileSectionsLayout />
        </Fragment>
    )
}