import Link from 'next/link'
import Image from 'next/image'

import aLogoWide from "@/assets/brand/logo.svg"
import aDashboard from "@/assets/product/dashboard.webp"

import "@/styles/auth.css"

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <div className='rings flex flex-col'>
            <div className='m-12 flex'>
                <Link href="/">
                    <Image src={aLogoWide} alt="UpAlert" className="h-10 w-auto" />
                </Link>
            </div>

            <div className='flex flex-row-reverse items-center grow mb-24 xl:mx-auto'>
                <div className='hidden md:flex items-center'>
                    <div className='bg-slate-100 shadow h-auto ring-1 ring-slate-200 -mr-48 xl:mr-0 rounded-lg overflow-hidden'>
                        <Image src={aDashboard} alt="The Dashboard" className='h-full' />
                    </div>
                </div>
                <div className='flex mx-auto md:mx-0 md:px-24'>
                    {children}
                </div>
            </div>
        </div>
    )
}
