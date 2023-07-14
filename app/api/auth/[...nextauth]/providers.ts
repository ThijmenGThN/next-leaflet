import CredentialsProvider from 'next-auth/providers/credentials'

export default [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            username: {
                label: "E-mail",
                type: "text",
                placeholder: "mail@leaflet.app"
            },
            password: {
                label: "Password",
                type: "password",
                placeholder: "••••••••"
            }
        },
        async authorize(credentials) {
            return {
                id: '12',
                name: 'Steven',
                password: 'alpine'
            }
        }
    })
]
