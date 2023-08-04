
const withNextIntl = require('next-intl/plugin')('./src/locales/i18n.ts')

module.exports = withNextIntl({
    images: {
        domains: ['www.gravatar.com']
    },
    experimental: {
        serverActions: true
    }
})
