"use client";

import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
    search: z.string().nonempty("Debe ingresar un término de búsqueda.").min(1).max(50),
});

type Schema = z.infer<typeof schema>;

export const useSearchHandler = () => {

    const router = useRouter();

    const { register, handleSubmit, reset, setFocus, watch } = useForm<Schema>({ resolver: zodResolver(schema), });

    const onSubmit: SubmitHandler<Schema> = async ({ search }: Schema) => {
        try {
            router.push(`/dashboard/search?query=${encodeURIComponent(search)}`);
            reset();
        } catch (error) {
            console.error("Error en la búsqueda:", error);
        }
    };

    return { register, handleSubmit, onSubmit, reset, setFocus, watch };
};