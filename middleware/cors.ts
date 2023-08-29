export default defineEventHandler((event) => {
    const headers = {
        'Access-Control-Allow-Origin': 'http://1820171-expertrealtyy.twc1.net/',
        'crossOriginResourcePolicy': 'http://1820171-expertrealtyy.twc1.net/',
        'crossOriginOpenerPolicy': 'http://1820171-expertrealtyy.twc1.net/',
        'crossOriginEmbedderPolicy': 'require-corp',
        'contentSecurityPolicy': "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        'X-XSS-Protection': 1
    }
    setHeaders(event, headers)

})