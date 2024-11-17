import { LynxButtons } from "@afx/components/button/button";
import { LynxForm, LynxFormItem } from "@afx/components/form/form.layout";
import { Icons } from "@afx/components/icons";
import LynxInputNumber from "@afx/components/input/input-number.layout";
import { IReqUpdateProduct, IResProductCategories } from "@afx/interfaces/portal/report/product.iface";
import { IActionProduct, IStateProduct } from "@lynx/models/portal/report/product.model";
import { useLynxStore } from "@lynx/store/core";
import { Col, FormInstance, Image, Row, Spin, Typography } from "antd";
import { useEffect, useState } from "react";


const itemLayouts = {
  wrapperCol: { span: 24 },
  labelCol: { span: 24 }
}

interface IUpdateProduct {
  form: FormInstance<IReqUpdateProduct>
  handleBack: () => void
  handleUpdate: () => void
}
export default function UpdateProduct(props: IUpdateProduct) {
  const { state: { product, productCategories }, isLoading } = useLynxStore<IStateProduct, IActionProduct>('product')
  const loading = isLoading('updateProduct') || false
  const [category, setCategory] = useState<string>('')

  useEffect(() => {
    const tempCategory = productCategories?.filter((item: IResProductCategories) => item?.value === Number(product?.category_id))
    const categoryName = tempCategory?.length === 0 ? '-' : tempCategory[0]?.label
    setCategory(categoryName)

  }, [product])

  return (
    <LynxForm form={props?.form} initialValues={product}>
      <Spin spinning={loading}>
        <Row gutter={[0, 40]}>
          <Col xs={24} xl={18} className="bg-primary-color-300 p-5">
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <div className="flex items-center gap-4 ">
                  <div className="bg-secondary-color rounded-full flex items-center justify-center w-8 h-8 cursor-pointer" onClick={props?.handleBack}>
                    <Icons type="ArrowLeftOutlined" size={18} className="text-white" />
                  </div>
                  <Typography className="text-[24px] xl:text-[40px] font-bold">Detail Product</Typography>
                </div>
              </Col>
              <Col span={24}>
                <div >
                  <Typography className="text-base font-normal mb-1">Product Name</Typography>
                  <div className="w-full bg-[#FFF] rounded-lg p-2">
                    <Typography>{product?.name}</Typography>
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div >
                  <Typography className="text-base font-normal mb-1">Description</Typography>
                  <div className="w-full bg-[#FFF] rounded-lg p-2 min-h-[76px]">
                    <Typography>{product?.description}</Typography>
                  </div>
                </div>
              </Col>
              <Col xs={24} md={24} xl={8}>
                <div >
                  <Typography className="text-base font-normal mb-1">SKU</Typography>
                  <div className="w-full bg-[#FFF] rounded-lg p-2">
                    <Typography>{product?.sku}</Typography>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div >
                  <Typography className="text-base font-normal mb-1">Stock</Typography>
                  <div className="w-full bg-[#FFF] rounded-lg p-2">
                    <Typography>{product?.stock}</Typography>
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div >
                  <Typography className="text-base font-normal mb-1">Category</Typography>
                  <div className="w-fit min-w-[76px] text-center bg-secondary-color rounded-lg p-2">
                    <Typography className="text-white">{category}</Typography>
                  </div>
                </div>
              </Col>
              <Col xs={12} xl={8}>
                <LynxFormItem
                  name="price"
                  label="Price"
                  {...itemLayouts}
                >
                  <LynxInputNumber controls={false} standart={false} className="!w-full" />
                </LynxFormItem>
              </Col>
              <Col xs={0} md={0} xl={16}>
                <LynxButtons title="Update" size="large" className="min-w-[156px] !mt-12 !bg-success-color float-right" onClick={props?.handleUpdate} />
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={24} xl={6}>
            <div className="bg-[#F5FCFF] h-full flex justify-center">
              <Image
                width={200}
                src={product?.image}
                className="py-10"
                preview={false}
              />
            </div>
          </Col>
          <Col xs={24} md={24} xl={0} className="p-5">
            <LynxButtons title="Update" size="large" className="mb-10 !w-full !bg-success-color" onClick={props?.handleUpdate} />
          </Col>
        </Row>
      </Spin>
    </LynxForm>
  )
}