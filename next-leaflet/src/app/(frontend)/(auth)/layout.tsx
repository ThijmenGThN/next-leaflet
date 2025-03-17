
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='h-screen'>
            <div className="flex min-h-full flex-1 flex-col justify-center py-12 bg-gray-50 sm:px-6 lg:px-8">
                <div className="relative mb-10 mt-36 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        {children}
                    </div>

                    <div className="absolute -bottom-10 left-5 text-center text-sm text-gray-500">
                        <a href="/">
                            ← Back to homepage
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
