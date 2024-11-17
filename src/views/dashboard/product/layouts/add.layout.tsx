import { LynxButtons } from "@afx/components/button/button";
import { LynxForm, LynxFormItem } from "@afx/components/form/form.layout";
import { Icons } from "@afx/components/icons";
import LynxDragDrop from "@afx/components/input/drag-drop.layout";
import LynxInputArea from "@afx/components/input/input-area.layout";
import LynxInputNumber from "@afx/components/input/input-number.layout";
import LynxInput from "@afx/components/input/input.layout";
import { LynxSelect } from "@afx/components/select/select";
import { IReqCreateProduct } from "@afx/interfaces/portal/report/product.iface";
import { IActionProduct, IStateProduct } from "@lynx/models/portal/report/product.model";
import { useLynxStore } from "@lynx/store/core";
import { Col, FormInstance, Row, Spin, Typography } from "antd";
import { useRef, useState } from "react";
import imageCompression from 'browser-image-compression'


const itemLayouts = {
  wrapperCol: { span: 24 },
  labelCol: { span: 24 }
}
const defaultOptions = {
  maxSizeMB: 1
}
interface IAddProduct {
  form: FormInstance<IReqCreateProduct>
  handleBack: () => void
  handleAdd: () => void
}
export default function AddProduct(props: IAddProduct) {
  const { state: { productCategories }, isLoading } = useLynxStore<IStateProduct, IActionProduct>('product')
  const loading = isLoading('createProduct') || false
  const [images, setImages] = useState<File | string>('')

  const fileInputRef = useRef<any>(null)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = e.target.files[0]
      try {
        const compressedFile = await imageCompression(newFile, defaultOptions)
        setImages(compressedFile)
        props?.form.setFieldValue('image', compressedFile?.name)
      } catch (error) {
        console.error('Error compressing image:', error)
      }
    }
  }

  const handleDrop = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFile = e.dataTransfer.files[0]
      try {
        const compressedFile = await imageCompression(newFile, defaultOptions)
        setImages(compressedFile)
        props?.form.setFieldValue('image', compressedFile?.name)
      } catch (error) {
        console.error('Error compressing image:', error)
      }
    }
  }
  function openFileExplorer() {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <LynxForm form={props?.form}>
      <Spin spinning={loading}>
        <Row gutter={[0, 40]}>
          <Col xs={24} md={24} xl={18} className="bg-primary-color-300 p-5">
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <div className="flex items-center gap-4 ">
                  <div className="bg-secondary-color rounded-full flex items-center justify-center w-8 h-8 cursor-pointer" onClick={props?.handleBack}>
                    <Icons type="ArrowLeftOutlined" size={18} className="text-white" />
                  </div>
                  <Typography className="text-[36px] xl:text-[40px] font-bold"> Add New Product</Typography>
                </div>
              </Col>
              <Col span={24}>
                <LynxFormItem
                  name="name"
                  label="Product Name"
                  {...itemLayouts}
                >
                  <LynxInput standart={false} />
                </LynxFormItem>
              </Col>
              <Col span={24}>
                <LynxFormItem
                  name="description"
                  label="Description"
                  {...itemLayouts}
                >
                  <LynxInputArea standart={false} />
                </LynxFormItem>
              </Col>
              <Col xs={24} md={24} xl={8}>
                <LynxFormItem
                  name="sku"
                  label="SKU"
                  {...itemLayouts}
                >
                  <LynxInput standart={false} />
                </LynxFormItem>
              </Col>
              <Col span={8}>
                <LynxFormItem
                  name="stock"
                  label="Stock"
                  {...itemLayouts}
                >
                  <LynxInputNumber controls={false} standart={false} className="!w-full" />
                </LynxFormItem>
              </Col>
              <Col span={24}>
                <LynxFormItem
                  name="category_id"
                  label="Category"
                  {...itemLayouts}
                >
                  <LynxSelect
                    options={productCategories}
                    loading={false}
                    className="!w-2/3"
                    size="large"
                    showSearch
                  />
                </LynxFormItem>
              </Col>
              <Col span={8}>
                <LynxFormItem
                  name="price"
                  label="Price"
                  {...itemLayouts}
                >
                  <LynxInputNumber controls={false} standart={false} className="!w-full" />
                </LynxFormItem>
              </Col>
              <Col xs={0} md={0} xl={16}>
                <LynxButtons title="Publsih" size="large" className="min-w-[156px] !mt-12 !bg-success-color float-right" onClick={props?.handleAdd} />
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={24} xl={6}>
            <div className="xs:p-5  !md:p-5 bg-[#F5FCFF] h-full flex justify-center">
              <Col span={16}>
                <LynxFormItem
                  name="image"
                  label=""
                  {...itemLayouts}
                >
                  <LynxDragDrop
                    handleDrop={handleDrop}
                    inputRef={fileInputRef}
                    handleChangeInput={handleChange}
                    OpenFile={openFileExplorer}
                    images={images}
                  />
                </LynxFormItem>
              </Col>
            </div>
          </Col>
          <Col xs={24} md={24} xl={0} className="p-5">
            <LynxButtons title="Publsih" size="large" className="mb-10 !w-full !bg-success-color float-right" onClick={props?.handleAdd} />
          </Col>
        </Row>
      </Spin>
    </LynxForm>
  )
}