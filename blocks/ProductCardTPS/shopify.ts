if (!process.env.SHOPIFY_STORE_DOMAIN) {
  throw new Error('Missing required environment variable SHOPIFY_STORE_DOMAIN')
}
if (!process.env.SHOPIFY_STOREFRONT_API_TOKEN) {
  throw new Error(
    'Missing required environment variable SHOPIFY_STOREFRONT_API_TOKEN'
  )
}

export default {
  domain: 'trigger-point-systems.myshopify.com',
  storefrontAccessToken: '446d3e2aac57fef20ecc92c34297b6d9',
}
