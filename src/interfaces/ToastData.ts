interface Message {
  title: string;
  description: string;
}

export interface ToastData {
  message: Message;
  type?: "error"|"warning"|"success"|"achievement";
}