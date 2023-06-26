import Sidebar from "@/components/dash/Sidebar"

import type { iUser } from '@/types/globals'

export default async function Page() {

    const user: iUser = {
        email: 'mail@thijmenheuvelink.nl',
        first_name: 'Thijmen',
        last_name: 'Heuvelink'
    }

    return (
        <Sidebar user={user}>

            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="px-4 py-5 sm:p-6">
                    Content
                </div>
            </div>

        </Sidebar>
    )
}
