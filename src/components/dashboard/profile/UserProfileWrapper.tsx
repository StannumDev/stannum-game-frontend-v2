'use client'

import { Fragment, useCallback, useEffect, useState } from "react";
import { getUserDetailsByUsername } from "@/services";
import { errorHandler } from "@/helpers";
import { UserProfileDetails, ProfileSectionsLayout, LoadingScreen } from "@/components";
import { FullUserDetails } from "@/interfaces";
import { PowerIcon } from "@/icons";
import { useUserStore } from "@/stores/userStore";

interface Props{
    username: string;
}

export const UserProfileWrapper = ({username}:Props) => {
    const owner = useUserStore(s => s.user?.username) === username;
    const storeLogout = useUserStore(s => s.logout);

    const [userData, setUserData] = useState<FullUserDetails|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchUserData = useCallback( async (force: boolean = false) => {
        setIsLoading(true);
        try {
            setUserData(await getUserDetailsByUsername(username, { force }));
        } catch (error:unknown) {
            errorHandler(error);
        } finally {
            setIsLoading(false);
        }
    }, [username]);

    useEffect(() => {
        fetchUserData(true);
    }, [username, fetchUserData]);

    
    const onLogout = () => {
        storeLogout();
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