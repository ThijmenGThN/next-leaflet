import type { Access, AccessArgs } from "payload";

export const isAdmin: Access = ({ req: { user } }: AccessArgs) => {
	return Boolean(user?.role === "admin");
};

export const isOwnerOrAdmin: Access = ({ req: { user }, id }: AccessArgs) => {
	if (user?.role === "admin") {
		return true;
	}
	
	return user?.id === id;
};
