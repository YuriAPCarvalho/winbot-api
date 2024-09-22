import { getIO } from '../../libs/socket';
import Message from '../../models/Message';
import Ticket from '../../models/Ticket';
import Whatsapp from '../../models/Whatsapp';
import nodemailer from 'nodemailer';

interface MessageData {
  id: string;
  ticketId: number;
  body: string;
  contactId?: number;
  fromMe?: boolean;
  read?: boolean;
  mediaType?: string;
  mediaUrl?: string;
  ack?: number;
  queueId?: number;
}
interface Request {
  messageData: MessageData;
  companyId: number;
}

const CreatePasswordReset = async ({
  messageData,
  companyId
}: Request): Promise<Message> => {
  const nodemailer = require('nodemailer');

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: 'arguelho067@gmail.com',
      pass: process.env.SENHA_ALAN
    }
  });

  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch 👻" <arguelho067@gmail.com>', // sender address
    to: 'alanarguelho2@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
  });

  return info;
};

export default CreatePasswordReset;
