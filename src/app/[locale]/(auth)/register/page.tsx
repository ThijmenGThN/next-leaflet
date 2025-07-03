"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createUser } from '@/functions/users'
import { useRouter, Link } from '@/locales/navigation'
import { UserPlus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'

type FormData = {
    email: string
    password: string
    confirmPassword: string
    firstname: string
    lastname: string
}

export default function Page() {
    const router = useRouter()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async ({ email, password, firstname, lastname }: FormData) => {
        setIsLoading(true)
        setErrorMessage(null)
        
        try {
            const user = await createUser({
                email, 
                password,
                firstname,
                lastname
            })

            if (!user) {
                setErrorMessage('Failed to create account. Email may already be in use.')
                setIsLoading(false)
                return
            }

            const req = await fetch(`/api/users/login`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            if (req.ok) {
                router.push("/dash")
            } else {
                router.push("/login")
            }
        } catch {
            setErrorMessage('An unexpected error occurred. Please try again.')
            setIsLoading(false)
        }
    }

    const password = watch('password')

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Create an account</CardTitle>
                    <CardDescription>Enter your details to create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    {errorMessage && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstname">First name</Label>
                                <Input
                                    id="firstname"
                                    {...register('firstname', { required: 'First name is required' })}
                                    placeholder="John"
                                    disabled={isLoading}
                                />
                                {errors.firstname && (
                                    <p className="text-sm text-destructive">{errors.firstname.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastname">Last name</Label>
                                <Input
                                    id="lastname"
                                    {...register('lastname', { required: 'Last name is required' })}
                                    placeholder="Doe"
                                    disabled={isLoading}
                                />
                                {errors.lastname && (
                                    <p className="text-sm text-destructive">{errors.lastname.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                {...register('email', { 
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                                type="email"
                                placeholder="john.doe@example.com"
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
                                {...register('password', { 
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters'
                                    }
                                })}
                                type="password"
                                disabled={isLoading}
                            />
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm password</Label>
                            <Input
                                id="confirmPassword"
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: value => value === password || 'Passwords do not match'
                                })}
                                type="password"
                                disabled={isLoading}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Create account
                                </>
                            )}
                        </Button>

                        <div className="text-center text-sm space-y-2">
                            <div>
                                <Link href="/reset" className="text-primary underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <div>
                                Already have an account?{' '}
                                <Link href="/login" className="text-primary underline">
                                    Login
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}