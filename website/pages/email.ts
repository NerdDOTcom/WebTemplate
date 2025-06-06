type Secret = {
    serviceID: string,
    templateID: string,
    publicKey: string
}

export async function sendEmail(email: string) {
    let w;
    let secret = await (await fetch("secret.json")).json() as Secret;
    if (email == null) {
         w = 'iamanormalhumanboy@gmail.com';
    }
    else
    {
        w = email;
    }
    const url = 'https://api.emailjs.com/api/v1.0/email/send';

    const data = {
        service_id: secret.serviceID,
        template_id: secret.templateID,
        user_id: secret.publicKey,
        template_params: {
            from: 'Mike audience',
            to: w,
            title: 'First Message',
            time: new Date(),
            message: 'Hello!!!!!!!!!!!!!!'
        }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    console.log(await response.text());
}