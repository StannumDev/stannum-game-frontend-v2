import axios from "axios";
import Cookies from "js-cookie";
import type { Area } from "react-easy-crop";

const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    });

const getRadianAngle = (degreeValue: number): number =>
    (degreeValue * Math.PI) / 180;

const rotateSize = (width: number, height: number, rotation: number) => {
    const rotRad = getRadianAngle(rotation);
    return {
        width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
};

export const getCroppedImage = async ( imageSrc: string, pixelCrop: Area, rotation: number = 0, outputSize: number = 1080 ): Promise<Blob> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('Failed to get canvas 2d context.');

    const rotRad = getRadianAngle(rotation);
    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.translate(-image.width / 2, -image.height / 2);
    ctx.drawImage(image, 0, 0);

    const croppedCanvas = document.createElement('canvas');
    const croppedCtx = croppedCanvas.getContext('2d');

    if (!croppedCtx) throw new Error('Failed to get canvas 2d context.');

    croppedCanvas.width = outputSize;
    croppedCanvas.height = outputSize;

    croppedCtx.drawImage(
        canvas,
        pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height,
        0, 0, outputSize, outputSize
    );

    return new Promise((resolve, reject) => {
        croppedCanvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error('Failed to generate image blob.'));
                    return;
                }
                resolve(blob);
            },
            'image/jpeg',
            0.8
        );
    });
};

export const uploadProfilePhoto = async (imageBlob: Blob): Promise<void> => {
    try {
        const token = Cookies.get("token");
        if (!token) {
            throw new Error("Token is missing. Please log in again.");
        }

        const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PHOTO_URL}`;
        const authHeaders = { Authorization: `Bearer ${token}` };

        const presignRes = await axios.post(`${baseUrl}/presign-photo`, {}, { headers: authHeaders });
        if (!presignRes?.data?.success) throw new Error("Unexpected response structure");

        const { presignedUrl } = presignRes.data;

        await axios.put(presignedUrl, imageBlob, { headers: { "Content-Type": "image/jpeg" } });

        await axios.post(`${baseUrl}/confirm-photo`, {}, { headers: authHeaders });
    } catch (error:unknown) {
        throw error;
    }
};
