/**
 * Cloudflare Pages Function - /api/send-email
 */

export async function onRequestPost(context) {
    const { name, email, subject, message } = await context.request.json();

    try {
        const response = await fetch("https://api.mailersend.com/v1/email", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + context.env.MAILERSEND_API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: {
                    email: "contact@argobox.com",
                    name: "Daniel LaForce"
                },
                to: [
                    {
                        email: "daniel.laforce@argobox.com",
                        name: "Daniel LaForce"
                    }
                ],
                subject: `[Argobox] ${subject}`,
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

        if (!response.ok) {
            console.error("MailerSend Error:", await response.json());
            return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (err) {
        console.error("Unexpected Error:", err);
        return new Response(JSON.stringify({ error: "Unexpected server error" }), { status: 500 });
    }
}
