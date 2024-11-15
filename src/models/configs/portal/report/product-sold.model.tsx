import { IModelDefinitions } from "@afx/interfaces/global.iface"
import { IResProductSold } from "@afx/interfaces/portal/report/product-sold.iface"
import ProductSoldService from "@afx/services/portal/report/product-sold.service"

export type IStateProductSold = {
  productsSold: IResProductSold[]
}
export type IActionProductSold = {
  getProductSold: () => void
}

const productSoldModels: IModelDefinitions<IStateProductSold, IActionProductSold> = {
  name: 'productSold',
  subscriptions:
    (getStates, useActions) =>
      ({ pathname }) => { },
  model: (put, getStates, useActions) => ({
    state: {
      productsSold: []
    },
    actions: {
      async getProductSold() {
        try {
          const res = await ProductSoldService()
          put({
            productsSold: res
          })
        } catch (er: any) {
          return null
        }
      },
    }
  })
}

export default productSoldModels
