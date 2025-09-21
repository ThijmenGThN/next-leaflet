import { Button } from "@/components/ui/button";
import { Link } from "@/locales/navigation";

export function LogoutButton() {
	return (
		<Button asChild variant="outline" size="sm">
			<Link href="/login">
				Logout
			</Link>
		</Button>
	);
}