
function get(name: string): string | null {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null
    return null
}

function set(name: string, value: string, days: number) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = `${name}=${value}; expires=${expires}; path=/`
}

function clear(name: string) {
    set(name, '', -1)
}

const cookies = { get, set, clear }

export default cookies
