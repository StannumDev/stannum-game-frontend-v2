import axios from "axios";

export const validateReCAPTCHA = async (value:string|null):Promise<boolean> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_AUTH_URL}/${value}`);
        return response?.data?.success;
    } catch (error:unknown) {
        console.log(error);
        return false
    }
}