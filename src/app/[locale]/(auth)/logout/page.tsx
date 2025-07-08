"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, CheckCircle, Loader2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function Page() {
    const router = useRouter()
    const [step, setStep] = useState<'logging-out' | 'success' | 'redirecting'>('logging-out')

    useEffect(() => {
        const logoutProcess = async () => {
            try {
                await fetch('/api/users/logout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                })
                
                setTimeout(() => setStep('success'), 500)
                setTimeout(() => setStep('redirecting'), 1200)
                setTimeout(() => router.push('/login'), 2000)
            } catch (error) {
                console.error('Logout error:', error)
                router.push('/login')
            }
        }

        logoutProcess()
    }, [router])

    const getContent = () => {
        switch (step) {
            case 'logging-out':
                return {
                    icon: <Loader2 className="h-12 w-12 animate-spin text-primary" />,
                    title: "Logging out...",
                    description: "Securely ending your session"
                }
            case 'success':
                return {
                    icon: <CheckCircle className="h-12 w-12 text-green-500" />,
                    title: "Successfully logged out",
                    description: "Your session has been ended"
                }
            case 'redirecting':
                return {
                    icon: <LogOut className="h-12 w-12 text-blue-500" />,
                    title: "Redirecting...",
                    description: "Taking you back to login"
                }
        }
    }

    const content = getContent()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
            <Card className="w-full max-w-md shadow-lg">
                <CardContent className="p-8">
                    <div className="text-center space-y-6">
                        {/* Icon with animation */}
                        <div className="flex justify-center">
                            <div className="relative">
                                {content.icon}
                                {step === 'success' && (
                                    <div className="absolute inset-0 animate-ping">
                                        <CheckCircle className="h-12 w-12 text-green-500/30" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Title */}
                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold text-foreground">
                                {content.title}
                            </h1>
                            <p className="text-muted-foreground">
                                {content.description}
                            </p>
                        </div>

                        {/* Progress indicators */}
                        <div className="flex justify-center space-x-2 pt-4">
                            <div className={`h-2 w-8 rounded-full transition-all duration-300 ${
                                step === 'logging-out' ? 'bg-primary' : 'bg-muted'
                            }`} />
                            <div className={`h-2 w-8 rounded-full transition-all duration-300 ${
                                step === 'success' ? 'bg-green-500' : 'bg-muted'
                            }`} />
                            <div className={`h-2 w-8 rounded-full transition-all duration-300 ${
                                step === 'redirecting' ? 'bg-blue-500' : 'bg-muted'
                            }`} />
                        </div>

                        {/* Subtle footer */}
                        <div className="pt-4 text-xs text-muted-foreground">
                            You will be redirected automatically
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}