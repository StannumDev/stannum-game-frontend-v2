"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { searchUsers } from "@/services";
import { ArrowRightIcon } from "@/icons";
import { errorHandler } from "@/helpers";
import { AppError, UserSearchResult } from "@/interfaces";
import default_user from "@/assets/user/default_user.webp";
import { LoadingScreen } from "@/components";

interface Props {
    query: string;
}

export const SearchResultsList = ({ query }: Props) => {

    const [results, setResults] = useState<Array<UserSearchResult>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<AppError | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await searchUsers(query);
                setResults(data);
            } catch (error:unknown) {
                const appError:AppError = errorHandler(error);
                setError(appError);
            } finally {
                setIsLoading(false);
            }
        };

        if (query) fetchResults();
    }, [query]);

    return (
        <section className="w-full grow">
            { isLoading ? <div className="size-full"><LoadingScreen/></div> :
              error ? <p className="text-center lg:text-left text-invalid">{error.friendlyMessage}</p> :
              results.length === 0 ? <p className="text-center lg:text-left">No se encontraron resultados.</p> :
                <motion.ul 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    { results.map((user) => (
                        <li key={user.id} className="w-full card card-link p-0 flex overflow-hidden">
                            <Link href={`/dashboard/profile/${user.username}`} className="w-full flex">
                                <div className="h-full aspect-square relative">
                                    <Image
                                        priority
                                        width={112}
                                        height={112}
                                        src={ !user?.profilePhoto ? default_user : user?.profilePhoto}
                                        alt="Perfil de usuario STANNUM Game"
                                        className="size-full object-cover absolute top-0 left-0"
                                        />
                                </div>
                                <div className="p-4 lg:p-6 grow min-w-0 flex justify-between items-center gap-4">
                                    <div className="grow min-w-0 relative">
                                        <p className="w-full title-3 text-lg truncate">{user.name}</p>
                                        <p className="w-full subtitle-1 truncate">@{user.username}</p>
                                        { user.enterprise && <p className="mt-2 w-full text-sm text-stannum truncate">{user.jobPosition} - {user.enterprise}</p> }
                                    </div>
                                    <ArrowRightIcon className="size-4 text-card-lightest shrink-0"/>
                                </div>
                            </Link>
                        </li>
                    ))}
                </motion.ul>
            }
        </section>
    );
};