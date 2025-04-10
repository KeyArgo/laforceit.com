/**
 * Cloudflare Pages Function - /api/send-email
 */

export async function onRequestPost(context) {
    const { name, email, subject, message } = await context.request.json();

    try {
        // Check if API key is configured
        if (!context.env.MAILERSEND_API_KEY) {
            throw new Error('MailerSend API key is not configured');
        }

        console.log('Attempting to send email with MailerSend...');
        
        const response = await fetch("https://api.mailersend.com/v1/email", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + context.env.MAILERSEND_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: {
                    email: "contact@laforceit.com",
                    name: "Daniel LaForce"
                },
                to: [
                    {
                        email: "daniel.laforce@laforceit.com",
                        name: "Daniel LaForce"
                    }
                ],
                subject: `[LaForceIT] ${subject}`,
                html: `
                    <h2>New Contact Message</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
                `,
                reply_to: [
                    {
                        email,
                        name
                    }
                ]
            })
        });

        const responseData = await response.text();
        console.log("MailerSend Response:", responseData);

        if (!response.ok) {
            const errorDetail = responseData ? JSON.parse(responseData) : {};
            throw new Error(`MailerSend API error (${response.status}): ${JSON.stringify(errorDetail)}`);
        }

        return new Response(JSON.stringify({ success: true }), { 
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (err) {
        console.error("Email Send Error:", err);
        return new Response(JSON.stringify({ 
            error: "Failed to send email",
            details: err.message,
            timestamp: new Date().toISOString()
        }), { 
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
