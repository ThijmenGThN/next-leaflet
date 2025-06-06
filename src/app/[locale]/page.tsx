import { Link } from "@/locales/navigation"
import { useTranslations } from "next-intl"
import { ArrowRight, LogIn, UserPlus } from 'lucide-react'

export default function Page() {
    const t = useTranslations()

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0">
                            <h1 className="text-xl font-bold text-gray-800">
                                {t('next-leaflet')}
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/login"
                                className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-800"
                            >
                                {t('login')}
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg"
                            >
                                {t('register')}
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero section */}
            <main className="flex-grow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            {t('welcome-to-next-leaflet')}
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                            {t('an-optimized-tech-stack-for-efficiency-fast-reliable-and-ready-for-your-next-project')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/login"
                                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg flex items-center justify-center"
                            >
                                <LogIn className="h-5 w-5 mr-2" />
                                {t('sign-in')}
                            </Link>
                            <Link
                                href="/register"
                                className="px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg flex items-center justify-center"
                            >
                                <UserPlus className="h-5 w-5 mr-2" />
                                {t('create-account')}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white border-t border-gray-200 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {t('modern-features')}
                            </h3>
                            <p className="text-gray-600">
                                {t('designed-with-the-latest-technologies-and-best-practices')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 mb-4">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                    {t('fast-performance')}
                                </h4>
                                <p className="text-gray-600">
                                    {t('built-with-next-js-for-optimized-performance-and-a-great-user-experience')}
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mb-4">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                    {t('secure-authentication')}
                                </h4>
                                <p className="text-gray-600">
                                    {t('robust-user-authentication-and-authorization-system-built-in')}
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                    {t('internationalization')}
                                </h4>
                                <p className="text-gray-600">
                                    {t('supports-multiple-languages-and-locales-out-of-the-box')}
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <Link
                                href="/register"
                                className="inline-flex items-center text-primary-600 hover:text-primary-800 font-medium"
                            >
                                {t('get-started')}
                                <ArrowRight className="h-5 w-5 ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} {t('next-leaflet-all-rights-reserved')}
                    </div>
                </div>
            </footer>
        </div>
    )
}