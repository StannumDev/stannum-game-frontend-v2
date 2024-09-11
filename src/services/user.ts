import axios from "axios";
import { notFound } from "next/navigation";

interface User{
    username: string;
}

export const getUserById = async (id:number):Promise<User> =>{
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_USER_URL}/${id}`);
        return response.data;
    } catch (error:unknown) {
        console.log(error);
        notFound();
    }
}