import { useLynxStore } from "@lynx/store/core";
import BrowseHome from "./layouts/browse.layout";
import { IActionProductSold, IStateProductSold } from "@lynx/models/portal/report/product-sold.model";
import { useEffect } from "react";

export default function HomePage() {
  const { useActions, state } = useLynxStore<IStateProductSold, IActionProductSold>('productSold')

  const loadProduct = () => {
    useActions<'getProductSold'>('getProductSold', [], true)
  }

  useEffect(() => {
    loadProduct()
  }, [])
  return (
    <div className="p-5">
      <BrowseHome />
    </div>
  )
}