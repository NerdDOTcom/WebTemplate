export async function sendEmail() {
    let fileRes = (await (await fetch("secret.txt")).text()).split('\r\n');

    console.log(fileRes);

    const serviceID = 'your_service_id';
    const templateID = 'your_template_id';
    const publicKey = 'your_public_key';

    const templateParams = {
        from_name: 'Your Name',
        to_name: 'Recipient Name',
        message: 'Hello, this is a test email from TypeScript!',
        reply_to: 'you@example.com'
    };

    let response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            service_id: serviceID,
            template_id: templateID,
            user_id: publicKey,
            template_params: templateParams
        })
    });

    if (response.ok) {
        alert('Email sent successfully!');
    } else {
        alert('Failed to send email.');
    }
}
