import api from '@/lib/api';

const PAYMENT_URL = process.env.NEXT_PUBLIC_API_PAYMENT_URL;

export interface CreatePreferenceData {
    programId: string;
    type: 'self' | 'gift';
    giftDelivery?: 'email' | 'manual';
    giftEmail?: string;
    couponCode?: string;
}

export interface PreferenceResult {
    success: boolean;
    orderId: string;
    preferenceId?: string;
    initPoint?: string;
    status: string;
    directActivation?: boolean;
}

export interface OrderDetails {
    id: string;
    programId: string;
    type: 'self' | 'gift';
    giftDelivery: 'email' | 'manual' | null;
    giftEmail: string | null;
    keysQuantity: number;
    discountApplied: number;
    originalAmount: number;
    finalAmount: number;
    currency: string;
    status: string;
    productKeys: Array<{ code: string; used: boolean }>;
    fulfilledAt: string | null;
    giftEmailSent: boolean;
    createdAt: string;
}

export interface CouponResult {
    success: boolean;
    valid: boolean;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    discountApplied: number;
    originalAmount: number;
    finalAmount: number;
}

export const createPreference = async (data: CreatePreferenceData): Promise<PreferenceResult> => {
    const response = await api.post(`${PAYMENT_URL}/create-preference`, data);
    if (!response?.data?.success) throw new Error('Unexpected response structure');
    return response.data;
};

export const verifyPayment = async (paymentId?: string, orderId?: string): Promise<{ success: boolean; order: OrderDetails }> => {
    const response = await api.post(`${PAYMENT_URL}/verify`, { paymentId, orderId });
    if (!response?.data?.success) throw new Error('Unexpected response structure');
    return response.data;
};

export const getMyOrders = async (): Promise<{ success: boolean; orders: OrderDetails[] }> => {
    const response = await api.get(`${PAYMENT_URL}/my-orders`);
    if (!response?.data?.success) throw new Error('Unexpected response structure');
    return response.data;
};

export const applyCoupon = async (programId: string, couponCode: string): Promise<CouponResult> => {
    const response = await api.post(`${PAYMENT_URL}/apply-coupon`, { programId, couponCode });
    if (!response?.data?.success) throw new Error('Unexpected response structure');
    return response.data;
};

export const resendGiftEmail = async (orderId: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.post(`${PAYMENT_URL}/order/${orderId}/resend-email`);
    if (!response?.data?.success) throw new Error('Unexpected response structure');
    return response.data;
};
