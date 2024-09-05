import axios from "axios";
import { notFound } from "next/navigation";

export const getUserById = async (id:number):Promise<any> =>{
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_USER_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        notFound();
    }
}