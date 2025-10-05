import { LogIn, Palette, UserPlus } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Page() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="w-full max-w-md px-6">
				<Card>
					<CardContent className="pt-6">
						<div className="text-center space-y-6">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold text-foreground">Welcome</h1>
								<p className="text-muted-foreground">
									Get started by logging in or creating an account
								</p>
							</div>

							<div className="space-y-3">
								<Button asChild size="lg" className="w-full">
									<Link href="/login">
										<LogIn className="h-4 w-4 mr-2" />
										Login
									</Link>
								</Button>
								<div className="flex gap-2">
									<Button asChild variant="outline" size="lg" className="flex-1">
										<Link href="/register">
											<UserPlus className="h-4 w-4 mr-2" />
											Register
										</Link>
									</Button>
									<div className="shrink-0">
										<ThemeToggle size="lg" />
									</div>
								</div>
							</div>

							<div className="pt-2 border-t border-border">
								<Button asChild variant="ghost" size="sm" className="w-full">
									<Link href="/ui">
										<Palette className="h-4 w-4 mr-2" />
										View UI Components
									</Link>
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
