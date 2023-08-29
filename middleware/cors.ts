export default defineEventHandler((event) => {
    const headers = {
        'Access-Control-Allow-Origin': 'https://test.ekspert-realty.ru/',
        'crossOriginResourcePolicy': 'https://test.ekspert-realty.ru/',
        'crossOriginOpenerPolicy': 'https://test.ekspert-realty.ru/',
        'crossOriginEmbedderPolicy': 'require-corp',
        'contentSecurityPolicy': "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests",
        'X-XSS-Protection': 1
    }
    setHeaders(event, headers)

})