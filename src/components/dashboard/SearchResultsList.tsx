"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { searchUsers } from "@/services";
import { SearchIcon } from "@/icons";
import { UserSearchResult } from "@/interfaces";
import mateo from "@/assets/user/usuario_mateo.webp";

interface Props {
    query: string;
}

export const SearchResultsList = ({ query }: Props) => {

    const [results, setResults] = useState<Array<UserSearchResult>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResults = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const data = await searchUsers(query);
                setResults(data);
            } catch (err) {
                setError("No se encontraron resultados.");
            } finally {
                setIsLoading(false);
            }
        };

        if (query) fetchResults();
    }, [query]);

    return (
        <section className="w-full">
            { isLoading ? <p className="text-center text-neutral-600">Buscando resultados...</p> :
              error ? <p className="text-center text-red-500">{error}</p> :
              results.length === 0 ? <p className="text-center text-neutral-600">No se encontraron resultados.</p> :
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
                                        src={ !user?.profilePhoto ? mateo : user?.profilePhoto}
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
                                    <SearchIcon className="size-6 text-card-lightest shrink-0"/>
                                </div>
                            </Link>
                        </li>
                    ))}
                </motion.ul>
            }
        </section>
    );
};