import passport from 'passport';
import { NextResponse } from 'next/server';
import passportConfig from '@/helpers/auth/strategies/credentialsStrategy';

passportConfig(passport);

export async function POST(request: Request) {
  try {
    return new Promise((resolve, reject) => {
      passport.authenticate("basic", { session: false }, async (err: Error, user: unknown, info: unknown) => {
        console.log(user)
        if (err) {
          console.error(err);
          reject(new Error('Authentication error'));
        }
        if (!user) {
          console.error(info);
          reject(new Error('Invalid user credentialsssss'));
        }

        // Succesvolle authenticatie
        resolve(
          NextResponse.json({ message: 'Successfully authenticated.', user }, { status: 200 })
        );
      })(request, {}, reject);
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: `Error: ${error}`, status: 500 });
  }
}
