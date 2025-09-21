export async function logoutUser() {
	try {
		await fetch("/api/users/logout", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		});
		return { success: true };
	} catch (error) {
		console.error("Logout error:", error);
		return { success: false };
	}
}