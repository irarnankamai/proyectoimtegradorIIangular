import { Injectable } from '@angular/core';
import * as emailjs from 'emailjs-com';
@Injectable({
  providedIn: 'root'
})
export class CorreoService {
  constructor() {
    emailjs.init('Q0vkqFfoYqK_D1J5h');
  }

  sendEmail(toEmail: string, subject: string, message: string): Promise<emailjs.EmailJSResponseStatus> {
    const templateParams = {
      to_email: toEmail,
      subject: subject,
      message: message
    };

    return emailjs.send('service_v7f728j', 'template_np4mtfr', templateParams);
  }
}