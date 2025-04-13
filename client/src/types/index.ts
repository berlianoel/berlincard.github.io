export interface SecretMessage {
  id: string;
  text: string;
  date: string;
  read: boolean;
}

export interface ServiceOrder {
  id: string;
  name: string;
  whatsapp: string;
  service: string;
  details: string;
  date: string;
  completed: boolean;
}
