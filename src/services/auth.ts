import axios from "axios";

export const requestLogin = async (data:{username:string, password:string}) => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/`, data);
    } catch (error:unknown) {
        console.log(error);
    }
}