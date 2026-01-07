import { z } from "astro/zod";
import { ActionError, defineAction } from "astro:actions";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
    sendContactMail: defineAction({
        accept: 'form',
        input: z.object({
            name: z.string().optional(),
            email: z.string().email(),
            message: z.string(),
        }),
        handler: async ({name, email, message}) => {
            const { data, error } = await resend.emails.send({
                replyTo: email,
                from: "blog@dbodky.me",
                to: ['blog@dbodky.me'],
                subject: 'New blog message on dbodky.me',
                html: `${email} ${name ? '(' + name + ')' : ''} wrote:<br/><br/>${message.replaceAll('\n', '<br/>')}`,
            });

      if (error) {
        throw new ActionError({
          code: 'BAD_REQUEST',
          message: error.message,
        });
      }

      return data;
        }
    }),
};
