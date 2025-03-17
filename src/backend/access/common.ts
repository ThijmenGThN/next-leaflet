import type { Access, User } from 'payload'

export const isAdmin: Access = ({ req: { user } }: { req: { user: User | null } }) => {
    return Boolean(user?.role === 'admin');
}
