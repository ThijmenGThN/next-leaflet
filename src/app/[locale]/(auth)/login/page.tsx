"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter, Link } from '@/locales/navigation'
import { LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type FormData = {
    email: string
    password: string
}

export default function Page() {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async ({ email, password }: FormData) => {
        setIsLoading(true)
        setErrorMessage(null)

        try {
            const req = await fetch(`/api/users/login`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await req.json()

            if (!req.ok) {
                setErrorMessage(data.message || "Invalid email or password")
                setIsLoading(false)
                return
            }

            if (data.user) {
                router.push("/dash")
            }
        } catch {
            setErrorMessage("An unexpected error occurred. Please try again.")
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Enter your email and password to login</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                autoComplete="email"
                                placeholder="john.doe@example.com"
                                {...register('email', {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                {...register('password', { required: "Password is required" })}
                                disabled={isLoading}
                            />
                            <div className="flex items-center justify-between">
                                <div>
                                    {errors.password && (
                                        <p className="text-sm text-destructive">{errors.password.message}</p>
                                    )}
                                </div>
                                <div>
                                    <Link href="/reset" className="text-sm text-primary underline">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LogIn className="mr-2 h-4 w-4" />
                                    Sign in
                                </>
                            )}
                        </Button>

                        {errorMessage && (
                            <p className='text-sm text-destructive'>
                                {errorMessage}
                            </p>
                        )}

                        <div className="text-center text-sm">
                            Don&apos;t have an account?{' '}
                            <Link href="/register" className="text-primary underline">
                                Register
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}