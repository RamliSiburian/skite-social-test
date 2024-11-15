import { lazy } from 'react'

const Product = lazy(
  () => import('@afx/views/dashboard/product/index.layout')
)
export default function RouteProduct() {
  return <Product />
}
