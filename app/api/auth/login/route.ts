import passport from 'passport';
import { NextResponse } from 'next/server';

import '@/helpers/auth/strategies/credentialsStrategy';

export async function POST(request: Request) {
    try {
        // -- OBTAIN: Converts base64 auth string to email and password.
        const auth = request.headers.get('Authorization')?.replace(/^Basic\s+/i, '');
        const [email, password] = Buffer.from(auth ?? '', 'base64').toString().split(':');

        return new Promise((resolve, reject) => {
            passport.authenticate('local', { session: false }, (err: Error, user: unknown, info: unknown) => {
                if (err) {
                    console.error(err);
                    return reject(new Error('Authentication error'));
                }
                if (!user) {
                    console.error(info);
                    return reject(new Error('Invalid user credentials'));
                }

                // Succesvolle authenticatie
                resolve(NextResponse.json({ message: 'Successfully authenticated.', user }));
            })(request, null, reject);
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: `Error: ${error}`, status: 500 });
    }
}
