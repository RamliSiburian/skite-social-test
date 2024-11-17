import { LynxButtons } from "@afx/components/button/button";
import LoaderImages from "@afx/components/images/image-loader.layout";
import LynxCurrency from "@afx/components/typography/currency.layout";
import { IActionProduct, IStateProduct } from "@lynx/models/portal/report/product.model";
import { useLynxStore } from "@lynx/store/core";
import { Col, Image, Row, Table } from "antd";

interface IPropsProduct {
  handleAdd: () => void
  handleUpdate: (id: number) => void
  handleDelete: (id: number) => void
}
export default function BrowseProduct(props: IPropsProduct) {
  const { state: { products }, isLoading } = useLynxStore<IStateProduct, IActionProduct>('product')
  const loading = isLoading('getProducts') || isLoading('findProduct') || false

  return (
    <div className="p-5">
      <Row gutter={[0, 40]}>
        <Col span={24}>
          <LynxButtons title="Create Product" iconType="PlusOutlined" onClick={props?.handleAdd} className="float-right" size="large" />
        </Col>
        <Col span={24}>
          <Table
            scroll={{ x: 'max-content', y: 600 }}
            loading={loading}
            dataSource={products}
            columns={[
              {
                title: 'No',
                align: 'left',
                width: 80,
                dataIndex: 'id',
                key: 'no',
                render(value, record, index) {
                  return index + 1
                },
              },
              {
                title: 'Image',
                align: 'left',
                width: 80,
                dataIndex: 'image',
                key: 'image',
                render(value, record, index) {
                  return <Image
                    width={80}
                    src={value}
                  />
                },
              },
              {
                title: 'Name',
                align: 'left',
                width: 120,
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Price',
                align: 'left',
                width: 120,
                dataIndex: 'price',
                key: 'price',
                render(value, record, index) {
                  return <LynxCurrency value={value} />
                },
              },
              {
                title: 'Stock',
                align: 'left',
                width: 80,
                dataIndex: 'stock',
                key: 'stock',
              },
              {
                title: 'Description',
                align: 'left',
                width: 200,
                dataIndex: 'description',
                key: 'description',
              },
              {
                title: 'Action',
                align: 'left',
                width: 80,
                dataIndex: 'action',
                key: 'action',
                fixed: 'right',
                render(value, record, index) {
                  return (
                    <div className="flex items-center gap-2 justify-center">
                      <LynxButtons title="Update" onClick={() => props?.handleUpdate(record?.id)} />
                      <LynxButtons title="Delete" typeButton="danger-600" onClick={() => props?.handleDelete(record?.id)} />
                    </div>
                  )
                },
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  )
}