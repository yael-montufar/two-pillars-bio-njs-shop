import { restrictedRegister } from 'blocks/utils'
import dynamic from 'next/dynamic'
import { withChildren } from '@builder.io/react';  // import withChildren

const isDemo = Boolean(process.env.IS_DEMO)
const LazyProductView = dynamic(
  () =>
    isDemo
      ? import(`blocks/ProductUpsell/ProductUpsellDemo`)
      : import(`blocks/ProductUpsell/ProductUpsell`),
  { ssr: true }
)

const ProductUpsellWithBuilderChildren = withChildren(LazyProductView)

restrictedRegister(
  ProductUpsellWithBuilderChildren,
  {
    name: 'ProductView',
    image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/inpicture.svg',
    description:
      'Product details, should only be used in product page template, dynamically bind to product in context.',
    defaults: {
      bindings: {
        'component.options.product': 'state.product',
        'component.options.title': 'state.product.title',
        'component.options.description': 'state.product.descriptionHtml',
        'component.options.renderSeo': 'true',
      },
    },
  },
  ['product-page', 'theme']
)

restrictedRegister(
  ProductUpsellWithBuilderChildren,
  {
    name: 'ProductUpsell',
    image: 'https://unpkg.com/css.gg@2.0.0/icons/svg/ereader.svg',
    description: 'Choose a product to show its details on page',
    defaultStyles: {
      "marginTop": `0px`,
      "minHeight": `40px`,
      "backgroundColor": `white`
    },
    inputs: [
      {
        name: 'product',
        type: `${isDemo ? 'ShopifyStore' : 'Shopify'}ProductHandle`,
        helperText: 'Find a Shopify product by it\'s name'
      },
      {
        name: 'productKey',
        type: 'string',
      },
      {
        name: 'selectionId',
        type: 'number',
        helperText: 'Numeric identifier for product selection flow'
      },
      {
        name: 'modalHeading',
        type: 'text',
        helperText: 'Product title from shopify',
      },
      {
        name: 'productImages',
        type: 'object',
        defaultValue: {
          desktop: ''
        },
        subFields: [
          {
            name: 'desktop',
            type: 'file',
            allowedFileTypes: ['jpeg', 'jpg', 'png'],
          },
          {
            name: 'tablet',
            type: 'file',
            allowedFileTypes: ['jpeg', 'jpg', 'png'],
          },
          {
            name: 'mobile',
            type: 'file',
            allowedFileTypes: ['jpeg', 'jpg', 'png'],
          },
        ],
      },
      {
        name: 'productTitle',
        type: 'text',
      },
      {
        name: 'productDescription',
        type: 'richText',
      },
      {
        name: 'withUpsellButtonText',
        type: 'text'
      },
      {
        name: 'withoutUpsellButtonText',
        type: 'text'
      },
    ],
    canHaveChildren: true,
    defaultChildren: [
      {
        '@type': '@builder.io/sdk:Element',
        component: {
          name: 'Text',
          options: {
            text: 'drag and drop builder blocks into this component',
          },
        },
        responsiveStyles: {
          large: {
            textAlign: 'center',
          }
        }
      }
    ]
  },
  ['page', 'collection-page', 'theme']
)
