import '@assets/main.css'
import 'keen-slider/keen-slider.min.css'

import { FC } from 'react'
import type { AppProps } from 'next/app'

import { builder, Builder } from '@builder.io/react'
import builderConfig from '@config/builder'
builder.init(builderConfig.apiKey)

import '../blocks/ProductGrid/ProductGrid.builder'
import '../blocks/CollectionView/CollectionView.builder'
import '../blocks/ProductView/ProductView.builder'
import '../blocks/CloudinaryImage/CloudinaryImage.builder'

import '../blocks/FontAwesomeIcon/FontAwesomeIcon.builder'
import '../blocks/ProductCard/ProductCard.builder'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { library } from '@fortawesome/fontawesome-svg-core'
import { faLock, faTruckFast, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faShieldCheck, faArrowUpRightAndArrowDownLeftFromCenter, faCircleSmall } from '@fortawesome/pro-solid-svg-icons'
import { faInstagram, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons'
library.add(
  faLock,
  faTruckFast,
  faShieldCheck,
  faCheckCircle,
  faArrowUpRightAndArrowDownLeftFromCenter,
  faInstagram,
  faTwitter,
  faFacebookF,
  faCircleSmall,
)

Builder.register('insertMenu', {
  name: 'Shopify Collections Components',
  items: [
    { name: 'CollectionBox', label: 'Collection stuff' },
    { name: 'ProductCollectionGrid' },
    { name: 'CollectionView' },
  ],
})

Builder.register('insertMenu', {
  name: 'Shopify Products Components',
  items: [
    { name: 'ProductGrid' },
    { name: 'ProductBox' },
    { name: 'ProductView' },
  ],
})

Builder.register('insertMenu', {
  name: 'Cloudinary Components',
  items: [{ name: 'CloudinaryImage' }],
})

Builder.register('insertMenu', {
  name: 'Two Pillars',
  items: [
    { name: 'ProductCard' },
    { name: 'FontAwesomeIcon' }
  ],
})

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  return (
    <>
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
