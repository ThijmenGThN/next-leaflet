import { withPayload } from "@payloadcms/next/withPayload";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/locales/request.ts");

export default withNextIntl(
	withPayload({
		output: "standalone",
		images: {
			remotePatterns: [
				{
					protocol: "https",
					hostname: "www.gravatar.com",
				},
			],
		},
	}),
);
