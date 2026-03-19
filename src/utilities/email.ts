import * as EmailJS from "@emailjs/browser";

export interface EmailAdditionalData {
  url: string;
}
interface IEmailService {
  init(): void;
  sendEmail(
    to: string,
    subject: string,
    content: string,
    additionalData: EmailAdditionalData,
  ): Promise<boolean>;
}

export class EmailJSProvider implements IEmailService {
  init() {
    EmailJS.init({
      publicKey: "nafv2yUIsDh4beHr5",
      // Do not allow headless browsers
      blockHeadless: true,
      limitRate: {
        // Set the limit rate for the application
        id: "ibabbi",
        // Allow 1 request per 10s
        throttle: 10000,
      },
    });
  }
  async sendEmail(
    to: string,
    subject: string,
    content: string,
    additionalData: EmailAdditionalData,
  ): Promise<boolean> {
    let response: EmailJS.EmailJSResponseStatus = await EmailJS.send(
      "service_269nrpg",
      "template_nchgi4l",
      {
        url: additionalData.url,
        to_email: to,
      },
    );

    console.log(response);
    return true;
  }
}

export class EmailAdapter {
  private _emailService: IEmailService;
  constructor(service: IEmailService) {
    this._emailService = service;
    this._emailService.init();
  }
  sendEmail(
    to: string,
    subject: string,
    content: string,
    additionalData: EmailAdditionalData,
  ) {
    this._emailService.sendEmail(to, subject, content, additionalData);
  }
}
