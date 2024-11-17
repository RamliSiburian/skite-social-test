'use client'
import { useLynxModel } from "@lynx/model-reg";
import ProductPage from "./main.layout";

export default useLynxModel(ProductPage, () => [
  require('@lynx/models/portal/report/product.model').default
])