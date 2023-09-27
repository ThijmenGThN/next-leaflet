
const withNextIntl = require('next-intl/plugin')('./src/helpers/locales.ts')

module.exports = withNextIntl({
    images: {
        domains: ['www.gravatar.com']
    }
})
