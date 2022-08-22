import { restrictedRegister } from 'blocks/utils'
import dynamic from 'next/dynamic'
import { withChildren } from '@builder.io/react';  // import withChildren

const isDemo = Boolean(process.env.IS_DEMO)
const LazyProductView = dynamic(
  () =>
    isDemo
      ? import(`blocks/ProductCard/ProductCardDemo`)
      : import(`blocks/ProductCard/ProductCard`),
  { ssr: true }
)

const ProductCardWithBuilderChildren = withChildren(LazyProductView)

restrictedRegister(
  ProductCardWithBuilderChildren,
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
  ProductCardWithBuilderChildren,
  {
    name: 'ProductCard',
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
        name: 'isPreselected',
        type: 'boolean',
        helperText: 'Set this product as the default selected product'
      },
      {
        name: 'showSaveRibbon',
        type: 'boolean',
        helperText: 'Choose whether or not to display the \'Save $XX\' ribbon',
      },
      {
        name: 'title',
        type: 'text',
        helperText: 'Product title from shopify',
      },
      {
        name: 'productShots',
        type: 'list',
        subFields: [
          {
            name: 'image',
            type: 'file',
            allowedFileTypes: ['png'],
          },
          {
            name: 'title',
            type: 'string',
          },
        ],
      },
      {
        name: 'tag',
        type: 'richText',
        helperText: 'Product tag text'
      },
      {
        name: 'includedItems',
        type: 'list',
        subFields: [
          {
            name: 'copy',
            type: 'richText',
          },
          {
            name: 'bullet',
            type: 'string',
            defaultValue: 'circle-small',
            enum: [
              { label: 'Dot', value: 'circle-small' },
            ]
          },
        ],
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
