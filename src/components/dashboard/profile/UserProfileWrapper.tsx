'use client'

import { Fragment, useCallback, useEffect, useState } from "react";
import { getUserDetailsByUsername, logout } from "@/services";
import { errorHandler } from "@/helpers";
import { UserProfileDetails, ProfileSectionsLayout, LoadingScreen } from "@/components";
import { AppError, FullUserDetails } from "@/interfaces";
import { PowerIcon } from "@/icons";

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

    
    const onLogout = () => {
        try {
            logout();
        } catch (error:unknown) {
            const appError:AppError = errorHandler(error);
            console.error(appError)
        }
    }

    if(!userData || isLoading){
        return (
            <LoadingScreen/>
        )
    }

    return (
        <Fragment>
            <UserProfileDetails owner={owner} user={userData} fetchUserData={fetchUserData}/>
            <ProfileSectionsLayout owner={owner} user={userData} />
            { owner &&
                <div className="w-full lg:hidden">
                    <button onClick={onLogout} className="w-full card py-2 flex justify-between items-center text-invalid">
                        Cerrar sesión <PowerIcon/>
                    </button>
                </div>
            }
        </Fragment>
    )
}