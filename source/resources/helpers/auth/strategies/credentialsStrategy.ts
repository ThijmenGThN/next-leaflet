import { BasicStrategy } from "passport-http";
import prisma from "@/libs/prisma";

const validatePassword = (inputPassword: string, userPassword: string) =>
  true;

const passportConfig = (passport: any) => {
  passport.use(
    new BasicStrategy(async (username, password, done) => {
      try {
        const user = await prisma.user.findFirst({
          where: { email: username },
        });

        if (!user) {
          return done("Invalid user credentials");
        }

        const isValidPassword = validatePassword(password, user.password);

        if (!isValidPassword) {
          return done("Invalid user credentials");
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );
};

export default passportConfig;
