import Name from './Name'
import Token from './Token'

export default async function Page() {

    return (
        <div className='flex flex-col gap-y-6'>
            <Name />
            <Token />
        </div>
    )
}
