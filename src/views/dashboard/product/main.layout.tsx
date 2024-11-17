import { useLynxStore } from "@lynx/store/core";
import BrowseProduct from "./layouts/browse.layout";
import { IActionProduct, IStateProduct } from "@lynx/models/portal/report/product.model";
import { useEffect, useState } from "react";
import { Form, notification, Tabs } from "antd";
import AddProduct from "./layouts/add.layout";
import { IReqCreateProduct, IReqUpdateProduct } from "@afx/interfaces/portal/report/product.iface";
import { ModalDelete } from "@afx/components/modal/modal-delete";
import UpdateProduct from "./layouts/update";

export default function ProductPage() {
  const { state: { product }, useActions, isLoading } = useLynxStore<IStateProduct, IActionProduct>('product')
  const loadingDelete = isLoading('deleteProduct') || false
  const [activeKey, setActiveKey] = useState('browse')
  const [form] = Form.useForm<IReqCreateProduct>()
  const [formUpdate] = Form.useForm<IReqUpdateProduct>()
  const [modalDelete, setModalDetele] = useState<boolean>(false)
  const [idToDelete, setIdToDelete] = useState<number | null>(null)

  const loadProductCategory = () => {
    useActions<'getProductCategory'>('getProductCategory', [], true)
  }
  const loadProducts = () => {
    useActions<'getProducts'>('getProducts', [], true)
  }

  useEffect(() => {
    loadProductCategory()
    loadProducts()
  }, [])

  const handleAdd = () => {
    form?.validateFields().then(val => {
      useActions<'createProduct'>('createProduct', [val, () => {
        setActiveKey('browse')
        loadProducts()
      }], true)

    }).catch((err: any) => {
      return notification.warning({
        message: 'Required Form',
        description: err?.errorFields?.[0]?.errors
      })
    })
  }
  const handleUpdate = () => {
    formUpdate?.validateFields().then(val => {
      useActions<'updateProduct'>('updateProduct', [product?.id, val, () => {
        setActiveKey('browse')
        loadProducts()
      }], true)

    }).catch((err: any) => {
      return notification.warning({
        message: 'Required Form',
        description: err?.errorFields?.[0]?.errors
      })
    })
  }
  const handleDetail = (id: number) => {
    useActions<'findProduct'>('findProduct', [id, () => {
      setActiveKey('update')
    }], true)
  }
  const handleDelete = () => {
    idToDelete !== null && useActions<'deleteProduct'>('deleteProduct', [idToDelete, () => {
      setModalDetele(false)
      loadProducts()
      setIdToDelete(null)
    }], true)
  }
  return (
    <div className="">
      <Tabs
        activeKey={activeKey}
        tabBarStyle={{ display: 'none' }}
        items={[
          {
            key: 'browse',
            label: 'Browse',
            children: (
              <BrowseProduct
                handleAdd={() => setActiveKey('create')}
                handleUpdate={handleDetail}
                handleDelete={(id: number) => {
                  setIdToDelete(id)
                  setModalDetele(true)
                }}
              />
            )
          },
          {
            key: 'create',
            label: 'Create',
            children: (
              <AddProduct
                {...{ form }}
                handleBack={() => {
                  setActiveKey('browse')
                  form.resetFields()
                }}
                handleAdd={handleAdd}
              />
            )
          },
          {
            key: 'update',
            label: 'Update',
            children: (
              <UpdateProduct
                form={formUpdate}
                handleBack={() => {
                  setActiveKey('browse')
                  formUpdate.resetFields()
                }}
                handleUpdate={handleUpdate}
              />
            )
          }
        ]}
      />
      <ModalDelete
        loading={loadingDelete}
        open={modalDelete}
        onCancel={() => {
          setModalDetele(false)
          setIdToDelete(null)
        }}
        handleClickDelete={handleDelete}
        title="Prduct"
      />

    </div>
  )
}