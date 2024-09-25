function EmailBody(userData: any, urlSystem: string, tokenSenha: string) {
  return ` <!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Recuperação de Senha</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #000;
        background-color: #fff;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: center;
        padding: 10px 0;
      }
      .content {
        margin: 20px 0;
        text-align: left;
      }
      .btn {
        display: inline-block;
        padding: 10px 20px;
        background-color: #000;
        color: white;
        text-decoration: none;
        font-weight: bold;
      }
      .footer {
        margin-top: 30px;
        font-size: 12px;
        text-align: center;
        color: #555;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img
          src="https://app.winbot.ai/static/media/logo.f64f8b1b.png"
          width="70%"
        />
        <h1>Solicitação de Recuperação de Senha</h1>
      </div>

      <div class="content">
        <p>Olá, ${userData?.name}</p>
        <p>
          Você solicitou a redefinição da sua senha. Por favor, clique no botão
          abaixo para redefini-la:
        </p>
        <p style="text-align: center">
          <a href="${urlSystem}/resetpsw?hash=${tokenSenha}&email=${
    userData?.email
  }" class="btn">Redefinir Senha</a>
        </p>
        <p>
          Se você não solicitou essa redefinição de senha, por favor, ignore
          este e-mail ou entre em contato com nossa equipe de suporte caso tenha
          alguma dúvida.
        </p>
        <p>Obrigado!</p>
      </div>

      <div class="footer">
        <p>
          Se o botão acima não funcionar, copie e cole o seguinte link no seu
          navegador:
        </p>
        <p>${`${urlSystem}/resetpsw?hash=${tokenSenha}&email=${userData?.email}`}</p>
        <p>&copy; 2024 WinbotAI. Todos os direitos reservados.</p>
      </div>
    </div>
  </body>
</html>
`;
}

export default EmailBody;
