import type { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
    return Boolean(user && user.role === 'admin')
}
