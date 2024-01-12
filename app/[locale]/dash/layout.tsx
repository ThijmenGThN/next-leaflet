"use client"

import { Menu } from '@headlessui/react'
import { useTranslations } from 'next-intl'

import { Link } from '@/helpers/navigation'
import { classNames } from '@/helpers/tailwind'

import Interface from "@/components/Interface"

import {
    FlagIcon,
    HomeIcon,
} from '@heroicons/react/24/outline'

export default function Layout({ children }: { children: React.ReactNode }) {
    const t = useTranslations('dash')

    return (
        <Interface
            navigation={[
                { name: 'Dashboard', href: '/dash', icon: HomeIcon },
                { name: 'Example', href: '/dash/example', icon: FlagIcon },
            ]}
            menuItems={(
                <div className="py-1">
                    <Menu.Item>
                        {({ active }) => (
                            <Link
                                href="/dash/account"
                                className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                )}
                            >
                                {t('account')}
                            </Link>
                        )}
                    </Menu.Item>
                </div>
            )}
        >
            {children}
        </Interface>
    )
}
