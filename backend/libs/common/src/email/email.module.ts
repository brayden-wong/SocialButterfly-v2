import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EmailService } from "./email.service";

// /usr/src/app/dist/apps/users/views/templates/
// /usr/src/app/dist/apps/users/views/templates/register-user.hbs

// const helpers = {
//   handlebarsIntl: function(value: any) {
//     console.log(value);
//     let context = {
//       value: value
//     };
//     console.log(context);

//     var intlData = {
//       locales: ['en-US'],
//     };

//     // use the formatNumber helper from handlebars-intl
//     const template = handlebars.compile('{{formatNumber value}} is the final result!');

//     const compiled = template(context, {
//       data: {intl: intlData}
//     });
//     return compiled
//   }
// }

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        transport: {
          port: config.get<number>('email_port'),
          host: 'smtp.gmail.com',
          // port: 587,
          secure: false,
          requireTLS: true,
          logger: true,
          textEncoding: 'base64',
          auth: {
            user: config.get<string>('email_username'),
            pass: config.get<string>('email_password')
          }
        }, template: {
          dir: './apps/users/src/views/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true
          }
        }
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule { }