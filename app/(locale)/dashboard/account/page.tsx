import { getServerSession } from 'next-auth'

import Name from './Name'
import Token from './Token'

export default async function Page() {
    const session = await getServerSession()

    return (
        <div className='flex flex-col gap-y-6'>
            <Name name={session?.user.name ?? ''} />
            <Token />
        </div>
    )
}
