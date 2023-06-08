import Image from 'next/image'
import Link from 'next/link'

import aLogo from '@/assets/branding/logo.webp'

export default function Component() {

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="-m-1.5 p-1.5">
                        <Image
                            className="h-8 w-auto"
                            src={aLogo}
                            alt="Logo"
                        />
                    </Link>
                </div>
            </nav>
        </header>
    )
}
