import { CardCustom } from "@afx/components/card/card-custom";
import { LynxSelect } from "@afx/components/select/select";
import Typography from "antd/es/typography/Typography";
import Charts from "./chart.layout";
import { IActionProductSold, IStateProductSold } from "@lynx/models/portal/report/product-sold.model";
import { useLynxStore } from "@lynx/store/core";
import { Col, Row } from "antd";

const datas = [
  { name: 'Item A', value: 120.00 },
  { name: 'Item B', value: 80.00 },
  { name: 'Item C', value: 760.00 }
]
export default function BrowseHome() {
  const { state } = useLynxStore<IStateProductSold, IActionProductSold>('productSold')
  return (
    <Row gutter={[0, 40]}>
      <Col span={24}>
        <CardCustom
          className="rounded-xl"
          children={
            <>
              <div className="flex items-center justify-between mb-10">
                <Typography className="text-lg font-semibold text-black">Product Sold</Typography>
                <LynxSelect
                  defaultValue=''
                  loading={false}
                  options={[
                    { label: 'All times', value: '' },
                    { label: 'This Week', value: 'this week' },
                  ]}
                  className="min-w-[156px]"
                />
              </div>
              <Charts data={state?.productsSold} />
            </>
          }
        />
      </Col>
      <Col span={8}>
        <CardCustom
          className="rounded-xl"
          children={
            <>
              <div className="flex items-center justify-between mb-10">
                <Typography className="text-lg font-semibold text-black">Top Selling Product</Typography>
                <LynxSelect
                  defaultValue=''
                  loading={false}
                  options={[
                    { label: 'All times', value: '' },
                    { label: 'This Week', value: 'this week' },
                  ]}
                  className="min-w-[156px]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Typography>Name</Typography>
                  <Typography>Value</Typography>
                </div>

                {
                  datas.map(item => (
                    <div className="flex items-center justify-between mb-2">
                      <Typography>{item?.name}</Typography>
                      <Typography>$ {item?.value}</Typography>
                    </div>
                  ))
                }
              </div>
            </>
          }
        />
      </Col>
    </Row>
  )
}