import axios from "axios";
import AvatarEditor from "react-avatar-editor";
import Cookies from "js-cookie";

export const preprocessImage = (editorRef: AvatarEditor | null): Promise<Blob | null> => {
    return new Promise((resolve, reject) => {
        if (!editorRef) {
            reject(new Error("Editor reference is missing."));
            return;
        }

        const canvas = editorRef.getImageScaledToCanvas();
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error("Failed to generate image blob."));
                    return;
                }
                resolve(blob);
            },
            "image/jpeg",
            0.8
        );
    });
};

export const uploadProfilePhoto = async (formData: FormData): Promise<void> => {
    try {
        const token = Cookies.get("token");
        if (!token) {
            throw new Error("Token is missing. Please log in again.");
        }

        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PHOTO_URL}/upload-photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error: unknown) {
        throw error;
    }
};

export const deleteProfilePhoto = async (): Promise<void> => {
    try {
        const token = Cookies.get("token");
        if (!token) {
            throw new Error("Token is missing. Please log in again.");
        }

        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PHOTO_URL}/delete-photo`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error: unknown) {
        throw error;
    }
};