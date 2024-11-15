import { rest } from "@afx/utils/config.rest";
import request from "@afx/utils/request.util";

export default function ProductSoldService() {
  return request<any>({
    url: rest.dashboard.report.productSold,
    method: 'GET'
  })
}