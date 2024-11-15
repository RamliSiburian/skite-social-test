'use client'
import { useLynxModel } from "@lynx/model-reg";
import Home from "./main.layout";

export default useLynxModel(Home, () => [
  require('@lynx/models/portal/report/product-sold.model').default
])