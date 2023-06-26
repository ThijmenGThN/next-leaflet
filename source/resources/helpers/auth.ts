import axios from 'axios'

interface iUser {
    email?: string
    password?: string

    first_name?: string
    last_name?: string
}

export async function login(user: iUser) {

    try {
        const { email: username, password } = user

        return await axios.post('/api/user/login',
            null,
            {
                auth: {
                    username: username ?? '',
                    password: password ?? ''
                }
            }
        )
    }

    catch ({ response: { data: error } }: any) { throw error }
}

export async function register(user: iUser) {

    try {
        const { email: username, password, ...details } = user

        return await axios.post('/api/user/register',
            details,
            {
                auth: {
                    username: username ?? '',
                    password: password ?? ''
                }
            }
        )
    }

    catch ({ response: { data: error } }: any) { throw error }
}