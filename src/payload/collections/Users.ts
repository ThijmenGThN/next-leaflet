import { render } from "@react-email/render";
import type { CollectionConfig } from "payload";
import React from "react";

import Reset from "@/shared/emails/Reset";
import { isOwnerOrAdmin } from "../access/common";

export const Users: CollectionConfig = {
	slug: "users",
	admin: {
		useAsTitle: "email",
	},
	access: {
		create: () => true,
		read: isOwnerOrAdmin,
		update: isOwnerOrAdmin,
		delete: isOwnerOrAdmin,
	},
	fields: [
		{
			name: "firstname",
			type: "text",
			required: true,
		},
		{
			name: "lastname",
			type: "text",
			required: true,
		},
		{
			name: "role",
			type: "select",
			required: true,
			defaultValue: "user",
			options: [
				{ label: "Admin", value: "admin" },
				{ label: "User", value: "user" },
			],
		},
	],
	timestamps: true,
	auth: {
		forgotPassword: {
			generateEmailHTML: async ({ token }: { token?: string } = {}) => {
				return await render(
					React.createElement(Reset, {
						ACTION_URL:
							process.env.NEXT_PUBLIC_DOMAIN + "/reset?token=" + token,
					}),
				);
			},
		},
	},
};
