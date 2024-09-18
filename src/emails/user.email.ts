import { transporter } from "../config";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class UserEmail {
  static confirmAccountEmail = async (user: IEmail) => {
    await transporter.sendMail({
      from: "PostulaNet <admin@postulanet.com>",
      to: user.email,
      subject: "Confirma tu cuenta",
      text: "Confirma tu cuenta",
      html: `
        <div style="width: 100%; max-width: 650px; margin: 0 auto; padding: 1rem; font-family: sans-serif;">
                <h1 style="text-align: center; color: #000; font-size: 2rem; font-weight: 700;">Bienvenido a PostulaNet</h1>
                <p style="text-align: center; color: #000; font-size: 1.2rem; font-weight: 400;">Hola <span style="font-weight: bold;">${user.name}</span>, gracias por registrarte en PostulaNet, para confirmar tu cuenta, por favor ingresa al siguiente enlace <a href="${process.env.FRONTEND_URL}/auth/confirm-account" style="text-decoration: none; color: #000; font-weight: bold;">confirmar cuenta</a> y escribe el código de confirmación, válido por 10 minutos:</p>
                <h2 style="text-align: center; color: #000; font-size: 2rem; font-weight: 700;">${user.token}</h2>  
                <p style="text-align: center; color: #000; font-size: 1.2rem; font-weight: 400;">Si no has sido tú quien ha solicitado está acción, por favor ignora este correo o contacta a soporte técnico.</p>
                <p style="text-align: center; color: #000; font-size: 1.2rem; font-weight: 400;">Saludos, PostulaNet.</p>
            </div>
        `,
    });
  };

  static forgotPasswordEmail = async (user: IEmail) => {
    await transporter.sendMail({
      from: "PostulaNet <admin@postulanet.com>",
      to: user.email,
      subject: "Restablecer password",
      text: "Restablecer password",
      html: `
      <div style="width: 100%; max-width: 650px; margin: 0 auto; padding: 1rem; font-family: sans-serif;">
              <h1 style="text-align: center; color: #000; font-size: 2rem; font-weight: 700;">PostulaNet</h1>
              <p style="text-align: center; color: #000; font-size: 1.2rem; font-weight: 400;">Hola <span style="font-weight: bold;">${user.name}</span>, para restablecer tu password ingresa al siguiente enlace: <a href="${process.env.FRONTEND_URL}/auth/update-password/${user.token}" style="text-decoration: none; color: #000; font-weight: bold;">Restablecer password</a>.
              
              <p style="text-align: center; color: #000; font-size: 1.2rem; font-weight: 400;">Si no has sido tú quien se ha solicitado está acción, por favor ignora este correo o contacta a soporte técnico.</p>
              <p style="text-align: center; color: #000; font-size: 1.2rem; font-weight: 400;">Saludos, PostulaNet.</p>
          </div>
      `,
    });
  };
}
