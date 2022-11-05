import { MailerService } from "@nestjs-modules/mailer";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

interface MailOptions {
  to: string;
  subject: string;
  template: string;
  context: any
}

@Injectable()
export class EmailService {
  constructor(
    @Inject(MailerService)
    private readonly mail: MailerService,
    @Inject(ConfigService)
    private readonly config: ConfigService
  ) { }

  async sendMail(options: MailOptions) {
    const { context, ...opt } = options;
    await this.mail.sendMail({
      headers: {
        'Content-Transfer-Encoding': 'base64'
      },
      from: this.config.get<string>('email_username'),
      ...opt,
      context: {
        ...context
      }
    });
  }
}