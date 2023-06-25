import axios from 'axios'

interface iProfile {
    first_name?: string
    last_name?: string
}

export async function login({ email, password }: { email?: string, password?: string }) {

    try {
        return (await axios.post('/api/v1/auth/login', null, {
            auth: {
                username: email ?? '',
                password: password ?? ''
            }
        })).data
    }

    catch ({ response: { data: error } }: any) { throw error }
}

export async function register({ email, password, profile }: { email?: string, password?: string, profile?: iProfile }) {

    try {
        return (await axios.post('/api/v1/auth/register', profile, {
            auth: {
                username: email ?? '',
                password: password ?? ''
            }
        })).data
    }

    catch ({ response: { data: error } }: any) { throw error }
}