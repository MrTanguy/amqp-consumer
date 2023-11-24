const amqp = require('amqplib');
const nodemailer = require('nodemailer');

// Configuration AMQP
const amqpHost = process.env.AMQP_HOST || 'amqp://host.docker.internal';
const queueName = 'logQueue';

// Configuration MailHog
const mailHogHost = 'mailhog';

// Connexion à RabbitMQ et création d'un canal
async function connectToRabbitMQ() {
    const connection = await amqp.connect(amqpHost);

    const channel = await connection.createChannel();

    // Assurer que la file d'attente existe
    await channel.assertQueue(queueName, { durable: false });

    // Écouter la file d'attente
    channel.consume(queueName, async (message) => {

        if (message !== null) {

            console.log('message catched !')

            const email = JSON.parse(message.content.toString()).message;

            // Envoyer un e-mail via MailHog
            await sendEmail(email);

            console.log(`E-mail envoyé à ${email}`);

            // Acknowledge le message pour le supprimer de la file d'attente
            channel.ack(message);
        }
    });
}

// Configuration de Nodemailer pour utiliser MailHog
const transporter = nodemailer.createTransport({
    host: mailHogHost,
    port: 1025, // This is the default port for MailHog SMTP server
    ignoreTLS: true,
});

// Fonction pour envoyer un e-mail
async function sendEmail(emailAddress) {
    const mailOptions = {
        from: 'tanguy.meignier@gmail.com',
        to: emailAddress,
        subject: 'EMAIL',
        text: 'Merci pour votre connexion !',
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Connecter et écouter la file d'attente RabbitMQ
connectToRabbitMQ().catch((err) => console.error('Erreur lors de la connexion à RabbitMQ :', err));
