import axios from "axios";
import Cookies from "js-cookie";

const tokenError = {
    response: {
        data: {
            success: false,
            code: "AUTH_TOKEN_MISSING",
            type: "error",
            showAlert: true,
            title: "Token no encontrado",
            techMessage: "The authentication token is missing from cookies.",
            friendlyMessage: "No se encontró el token de sesión. Por favor, inicia sesión nuevamente.",
        },
    },
};

export const markLessonAsCompleted = async (programName: string, lessonId: string): Promise<boolean> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError;

        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_LESSON_URL}/complete/${programName}/${lessonId}`, {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response?.data?.success;
    } catch (error:unknown) {
        throw error;
    }
};

export const saveLastWatchedLesson = async (programName: string, lessonId: string, currentTime: number): Promise<boolean> => {
    try {
        const token = Cookies.get("token");
        if (!token) throw tokenError;

        const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_LESSON_URL}/lastwatched/${programName}/${lessonId}`,
            { currentTime },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        if (!response?.data?.success) throw new Error("Unexpected response structure");
        return response.data.success;
    } catch (error:unknown) {
        throw error;
    }
};