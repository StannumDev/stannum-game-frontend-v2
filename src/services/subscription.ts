import api from '@/lib/api';

const SUBSCRIPTION_URL = process.env.NEXT_PUBLIC_API_SUBSCRIPTION_URL;

export interface CreateSubscriptionData {
    programId: string;
}

export interface CreateSubscriptionResult {
    success: boolean;
    message: string;
    initPoint: string;
    subscriptionId: string;
    priceARS: number;
    status: string;
}

export interface SubscriptionStatusResult {
    success: boolean;
    status: 'pending' | 'active' | 'paused' | 'cancelled' | 'expired' | null;
    priceARS: number | null;
    currentPeriodEnd: string | null;
    subscribedAt: string | null;
    cancelledAt: string | null;
    lastPaymentAt: string | null;
    hasAccess: boolean;
    currentMonthlyPriceARS: number | null;
    isPriceGrandfathered: boolean;
}

export interface SubscriptionPayment {
    id: string;
    amount: number;
    currency: string;
    status: 'approved' | 'rejected' | 'pending' | 'refunded';
    retryAttempt: number;
    receiptNumber: string | null;
    date: string;
}

export interface PaymentHistoryResult {
    success: boolean;
    payments: SubscriptionPayment[];
    total: number;
    page: number;
    pages: number;
}

export const createSubscription = async (data: CreateSubscriptionData): Promise<CreateSubscriptionResult> => {
    const response = await api.post(`${SUBSCRIPTION_URL}/create`, data);
    if (!response?.data?.success) throw new Error('Unexpected response structure');
    return response.data;
};

export const cancelSubscription = async (programId: string): Promise<{ success: boolean; status: string; accessUntil: string }> => {
    const response = await api.post(`${SUBSCRIPTION_URL}/cancel`, { programId });
    if (!response?.data?.success) throw new Error('Unexpected response structure');
    return response.data;
};

export const getSubscriptionStatus = async (programId: string): Promise<SubscriptionStatusResult> => {
    const response = await api.get(`${SUBSCRIPTION_URL}/status/${programId}`);
    if (!response?.data?.success) throw new Error('Unexpected response structure');
    return response.data;
};

export const getPaymentHistory = async (programId: string, page = 1): Promise<PaymentHistoryResult> => {
    const response = await api.get(`${SUBSCRIPTION_URL}/payments/${programId}?page=${page}`);
    if (!response?.data?.success) throw new Error('Unexpected response structure');
    return response.data;
};

export const downloadSubscriptionReceipt = async (paymentId: string): Promise<void> => {
    const response = await api.get(`${SUBSCRIPTION_URL}/payment/${paymentId}/receipt`, {
        responseType: 'blob',
    });
    const blob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const disposition = response.headers['content-disposition'];
    const filenameMatch = disposition?.match(/filename="?([^"]+)"?/);
    link.download = filenameMatch?.[1] || `comprobante-${paymentId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => window.URL.revokeObjectURL(url), 1000);
};

