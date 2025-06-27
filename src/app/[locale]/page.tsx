import { LogIn, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@/locales/navigation"

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <div className="max-w-md w-full px-6 text-center">
                <h1 className="text-4xl font-bold mb-2">Welcome</h1>
                <p className="text-muted-foreground mb-8">Get started by logging in or creating an account</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                        <Link href="/login">
                            <LogIn className="h-4 w-4 mr-2" />
                            Login
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                        <Link href="/register">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Register
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}