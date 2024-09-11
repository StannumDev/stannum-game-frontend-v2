import axios from "axios";

export const checkEmailExist = async (email:string):Promise<boolean> => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_USER_URL}/check-email`, email);
        return response?.data?.available;
    } catch (error:unknown) {
        console.log(error);
        return false;
    }
}