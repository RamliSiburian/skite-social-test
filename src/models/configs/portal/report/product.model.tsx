import { IModelDefinitions } from "@afx/interfaces/global.iface"
import { IResProductCategories, IResProduct, IReqCreateProduct, IReqUpdateProduct } from "@afx/interfaces/portal/report/product.iface"
import { CreateProductService, DeleteProductService, FindProductService, ProductsService, UpdateProductService } from "@afx/services/portal/report/product.service"
import { notification } from "antd"
import { filter } from "lodash"

export type IStateProduct = {
  products: IResProduct[]
  productCategories: IResProductCategories[]
  product: IResProduct
}
export type IActionProduct = {
  getProducts: () => void
  getProductCategory: () => void
  findProduct: (id: number, callback: () => void) => void
  createProduct: (data: IReqCreateProduct, callback: () => void) => void
  updateProduct: (id: number, data: IReqUpdateProduct, callback: () => void) => void
  deleteProduct: (id: number, callback: () => void) => void
}

const productModels: IModelDefinitions<IStateProduct, IActionProduct> = {
  name: 'product',
  subscriptions:
    (getStates, useActions) =>
      ({ pathname }) => { },
  model: (put, getStates, useActions) => ({
    state: {
      products: [],
      productCategories: [],
      product: {} as IResProduct
    },
    actions: {
      async getProductCategory() {
        try {
          const res = await ProductsService()
          if (res?.status) {
            const tempCategories = res?.response?.filter((item: { id: number, name: string }) => item?.name !== null).map((item: { id: number, name: string }) => ({ label: item?.name, value: item?.id }))
            put({
              productCategories: tempCategories
            })
          }
        } catch (er: any) {
          return null
        }
      },
      async getProducts() {
        try {
          const res = await ProductsService()
          put({
            products: res?.response
          })
        } catch (er: any) {
          return null
        }
      },
      async findProduct(id, callback) {
        try {
          const res = await FindProductService(id)
          put({
            product: res?.response
          })
          callback()
        } catch (er: any) {
          return null
        }
      },
      async createProduct(data, callback) {
        try {
          const res = await CreateProductService(data)
          if (res?.status) {
            notification.success({
              message: 'Success',
              description: res?.message,
              duration: 2,
              key: 'ADD-PRODUCT'
            })
            callback()
          }
        } catch (err: any) {
          return null
        }
      },
      async updateProduct(id, data, callback) {
        try {
          const res = await UpdateProductService(id, data)
          if (res?.status) {
            notification.success({
              message: 'Success',
              description: res?.message,
              duration: 2,
              key: 'UPDATE-PRODUCT'
            })
            callback()
          }
        } catch (err: any) {
          return null
        }
      },
      async deleteProduct(id, callback) {
        try {
          const res = await DeleteProductService(id)
          if (res?.status) {
            notification.success({
              message: 'Success',
              description: res?.message,
              duration: 2,
              key: 'DELETE-PRODUCT'
            })
            callback()
          }
        } catch (err: any) {
          return null
        }
      },
    }
  })
}

export default productModels
