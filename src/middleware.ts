import createMiddleware from "next-intl/middleware";
import { routing } from "@/locales/routing";

export default createMiddleware(routing);

export const config = {
	matcher: "/((?!api|trpc|_next|_vercel|admin|.*\\..*).*)",
};
