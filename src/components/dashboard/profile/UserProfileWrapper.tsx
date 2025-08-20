'use client'

import { Fragment, useCallback, useEffect, useState } from "react";
import { getUserDetailsByUsername } from "@/services";
import { errorHandler } from "@/helpers";
import { AppError, FullUserDetails } from "@/interfaces";
import { UserProfileDetails, ProfileSectionsLayout, LoadingScreen } from "@/components";

interface Props{
    username: string;
    owner: boolean;
}

export const UserProfileWrapper = ({username, owner}:Props) => {

    const [userData, setUserData] = useState<FullUserDetails|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchUserData = useCallback( async (force: boolean = false) => {
        setIsLoading(true);
        try {
            setUserData(await getUserDetailsByUsername(username, { force }));
        } catch (error:unknown) {
            const appError:AppError = errorHandler(error);
            console.error(appError);
        } finally {
            setIsLoading(false);
        }
    }, [username]);

    useEffect(() => {
        fetchUserData(true);
    }, [username, fetchUserData]);

    if(!userData || isLoading){
        return (
            <LoadingScreen/>
        )
    }

    return (
        <Fragment>
            <UserProfileDetails owner={owner} user={userData} fetchUserData={fetchUserData}/>
            <ProfileSectionsLayout owner={owner} user={userData} />
        </Fragment>
    )
}