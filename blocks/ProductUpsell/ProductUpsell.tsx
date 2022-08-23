/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useMemo, useState, useEffect } from 'react'
import { Themed, jsx } from 'theme-ui'
import { Grid, Button } from '@theme-ui/components'
import OptionPicker from '@components/common/OptionPicker'
import { NextSeo } from 'next-seo'
import { useUI } from '@components/ui/context'
import { useAddItemToCart } from '@lib/shopify/storefront-data-hooks'
import {
  prepareVariantsWithOptions,
  prepareVariantsImages,
  getPrice,
} from '@lib/shopify/storefront-data-hooks/src/utils/product'
import { ImageCarousel, LoadingDots } from '@components/ui'
import ProductLoader from './ProductLoader'
import { StateProvider } from "@builder.io/react";

interface Props {
  className?: string
  children?: any
  renderSeo?: boolean

  product: ShopifyBuy.Product
  productKey?: string
  selectionId?: number
  modalHeading?: string

  productImages?: {
    desktop?: any
    tablet?: any
    mobile?: any
  }

  productTitle?: string
  productDescription?: string
  withUpsellButtonText?: string
  withoutUpsellButtonText?: string
}

const ProductUpsell: React.FC<Props> = ({
  children,

  product,
  productKey,
  selectionId,
  modalHeading,
  productImages,
  productTitle,
  productDescription,
  withUpsellButtonText,
  withoutUpsellButtonText,
}) => {
  const [loading, setLoading] = useState(false)
  const addItem = useAddItemToCart()
  const colors: string[] | undefined = product?.options
    ?.find((option) => option?.name?.toLowerCase() === 'color')
    ?.values?.map((op) => op.value as string)

  const sizes: string[] | undefined = product?.options
    ?.find((option) => option?.name?.toLowerCase() === 'size')
    ?.values?.map((op) => op.value as string)

  const variants = useMemo(
    () => prepareVariantsWithOptions(product?.variants),
    [product?.variants]
  )
  const images = useMemo(() => prepareVariantsImages(variants, 'color'), [
    variants,
  ])

  const { openSidebar } = useUI()

  const [variant, setVariant] = useState(variants[0] || {})
  const [color, setColor] = useState(variant.color)
  const [size, setSize] = useState(variant.size)

  useEffect(() => {
    const newVariant = variants.find((variant) => {
      return (
        (variant.size === size || !size) && (variant.color === color || !color)
      )
    })

    if (variant.id !== newVariant?.id) {
      setVariant(newVariant)
    }
  }, [size, color, variants, variant.id])

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem(variant.id, 1)
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }
  const allImages = images
    .map(({ src }) => ({ src: src.src }))
    .concat(
      product.images &&
      product.images.filter(
        ({ src }) => !images.find((image) => image.src.src === src)
      )
    )

  const productCardState = {
    product,
    productKey,
    selectionId,
    modalHeading,
    productImages,
    productTitle,
    productDescription,
    withUpsellButtonText,
    withoutUpsellButtonText,
  }

  return (
    <StateProvider state={{ productCard: productCardState }}>
      <React.Fragment>
        {children}
      </React.Fragment>
    </StateProvider>
  )
}

const ProductView: React.FC<{
  product: string | ShopifyBuy.Product
  renderSeo?: boolean
  description?: string
  title?: string
}> = ({ product, ...props }) => {
  return (
    <ProductLoader product={product}>
      {(productObject) => <ProductUpsell {...props} product={productObject} />}
    </ProductLoader>
  )
}
export default ProductView
