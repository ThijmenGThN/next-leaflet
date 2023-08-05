
const withNextIntl = require('next-intl/plugin')('./i18n.ts')

module.exports = withNextIntl({
    images: {
        domains: ['www.gravatar.com']
    },
    experimental: {
        serverActions: true
    }
})
