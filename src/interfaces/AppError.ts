export interface AppError {
    success: boolean;
    code: string;
    type: "error" | "warning";
    showAlert: boolean;
    title: string;
    techMessage: string;
    friendlyMessage: string;
}