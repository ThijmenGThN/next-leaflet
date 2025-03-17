import type { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
    // 1. Must be user-type, 2. Grant access to admin.
    if (!user || user.collection !== 'users') return false
    if (user.role === 'admin') return true
    return false
}

export const isAdminOrSelf: Access = ({ req: { user } }) => {
    // 1. Must be user-type, 2. Grant access to admin.
    if (!user || user.collection !== 'users') return false
    if (user.role === 'admin') return true

    return {
        id: {
            equals: user.id,
        }
    }
}
