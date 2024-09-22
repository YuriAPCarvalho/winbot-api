import nodemailer from 'nodemailer';
import sequelize from 'sequelize';
import database from '../../database';
import Setting from '../../models/Setting';
import { config } from 'dotenv';
import EmailBody from './emailBody';
config();
interface UserData {
  companyId: number;
  name: string;
  email: string;
}
const SendMail = async (email: string, tokenSenha: string) => {
  const { hasResult, data } = await filterEmail(email);
  if (!hasResult) {
    return { status: 404, message: 'Email não encontrado' };
  }

  const userData = data[0][0] as UserData;
  if (!userData || userData.companyId === undefined) {
    return { status: 404, message: 'Dados do usuário não encontrados' };
  }
  const companyId = userData.companyId;
  const urlSmtp = process.env.MAIL_HOST;
  const userSmtp = process.env.MAIL_USER;
  const passwordSmpt = process.env.MAIL_PASS;
  const fromEmail = process.env.MAIL_FROM;
  const urlSistema = process.env.FRONTEND_URL;

  const transporter = nodemailer.createTransport({
    host: urlSmtp,
    port: 587,
    secure: false,
    auth: { user: userSmtp, pass: passwordSmpt }
  });
  if (hasResult === true) {
    const { hasResults, datas } = await insertToken(email, tokenSenha);
    console.log(datas);

    async function sendEmail() {
      try {
        const mailOptions = {
          from: userSmtp,
          to: email,
          subject: 'Redefinição de Senha - W I N B O T',
          html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Document</title>
                </head>
                <style>
                    .logoArea{
                    
                    display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: white;
                }
                .container{
                font-family: 'Roboto', sans-serif; display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                background-color:white;
                border-style:solid;
                border-width:2px;
                border-color:#c1c1c1;
                border-radius:20px;
                padding:10px;
                }
                .infoArea{
                padding-left: 10%; 
                }

                .a{
                color:blue;
                }
                </style>
                <body class="container">
                    <section
                    
                    class="logoArea"
                    
                    >
                    <img
                        src="https://app.winbot.ai/static/media/logo.f64f8b1b.png"
                        width="70%"
                        
                    />
                    </section>
                    <main style="">
                    <h4>Olá  ${userData?.name},</h4>
                    <p>você acaba de solicitar a recuperação de senha da sua conta,</p>
                    <p>para prosseguir basta acessar o link <a href="${urlSistema}/resetpsw?hash=${tokenSenha}&email=${userData?.email}" >Alterar senha</p>
                    </main>
                    <section></section>
                </body>
                </html>
            `
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado: ' + info.response);
      } catch (error) {
        console.log(error);
      }
    }

    sendEmail();
  }
};

const filterEmail = async (email: string) => {
  const sql = `SELECT * FROM "Users"  WHERE email ='${email}'`;
  const result = await database.query(sql, {
    type: sequelize.QueryTypes.SELECT
  });
  return { hasResult: result.length > 0, data: [result] };
};

const insertToken = async (email: string, tokenSenha: string) => {
  const sqls = `UPDATE "Users" SET "resetPassword"= '${tokenSenha}' WHERE email ='${email}'`;
  const results = await database.query(sqls, {
    type: sequelize.QueryTypes.UPDATE
  });
  return { hasResults: results.length > 0, datas: results };
};

export default SendMail;
