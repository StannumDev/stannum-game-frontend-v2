export interface AppError {
    success: boolean;
    code: string;
    type: "error"|"warning"|"success";
    showAlert: boolean;
    title: string;
    techMessage: string;
    friendlyMessage: string;
}