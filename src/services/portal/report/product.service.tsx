import { IReqCreateProduct, IReqUpdateProduct } from "@afx/interfaces/portal/report/product.iface";
import { rest } from "@afx/utils/config.rest";
import request from "@afx/utils/request.util";

export function ProductsService() {
  return request<any>({
    url: rest.dashboard.product.getProducts,
    method: 'GET'
  })
}

export function FindProductService(id: any) {
  return request<any>({
    url: rest.dashboard.product.findProduct.replace(':ID', id),
    method: 'GET'
  })
}

export function ProductCategoryService() {
  return request<any>({
    url: rest.dashboard.product.productcategories,
    method: 'GET'
  })
}

export function CreateProductService(data: IReqCreateProduct) {
  return request<any>({
    url: rest.dashboard.product.createProduct,
    data,
    method: 'POST'
  })
}

export function UpdateProductService(id: any, data: IReqUpdateProduct) {
  return request<any>({
    url: rest.dashboard.product.updateProduct.replace(':ID', id),
    data,
    method: 'PUT'
  })
}

export function DeleteProductService(id: any) {
  return request<any>({
    url: rest.dashboard.product.deleteProduct.replace(':ID', id),
    method: 'DELETE'
  })
}