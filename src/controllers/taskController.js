const { OAuth2Client } = require('google-auth-library');
const pool = require('../db');

// Initialize the client with your Google OAuth Client ID
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyGoogleToken(idToken) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        // Get the user profile data contained within the token
        const payload = ticket.getPayload();
        return {
            success: true,
            providerUserId: payload['sub'],
            email: payload['email'],
            name: payload['name'],
            picture: payload['picture']
        };
    } catch (error) {
        return { success: false, error: "Invalid token structure or signature" };
    }
}

async function findOrCreateAccount(req, res) {
    const { idToken, provider } = req.body;
    if (!idToken) {
        return res.status(401).json({
            status: "error",
            message: "Unauthorized",
        });
    }
    const result = await verifyGoogleToken(idToken);
    if (!result.success) {
        return res.status(401).json({
            status: "error",
            error: "Invalid authentication token.",
        });
    }

    const { providerUserId, email, name, picture } = result;
    try {
        // Insert into main user's table
        const result = await pool.query("INSERT INTO users (name, email, picture) VALUES ($1, $2, $3) RETURNING id", [name, email, picture]);
        const userId = result.rows[0].id;

        // Insert into auth_table
        await pool.query("INSERT INTO auth_table (user_id, provider, provider_user_id) VALUES($1, $2, $3) RETURNING user_id", [userId, provider, providerUserId]);
        return res.status(200).json({ id: userId });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "Failed to create user",
        });
    }
}

module.exports = { findOrCreateAccount };

// ec2-16-112-82-21.ap-south-2.compute.amazonaws.com
// 16.112.82.21