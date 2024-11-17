import { Modal, Space, Typography } from 'antd'
import { LynxButtons } from '../button/button'
import { Icons } from "../icons"

const { Text } = Typography

interface ModalCustom {
  /* defining style for modal */
  style?: any
  /* defining title for modal header */
  title: string | React.FC | React.JSX.Element
  /* defining close for modal when outside modal click*/
  maskClosable?: boolean
  /* defining open function button for modal */
  open: any
  /* defining cancel button for modal */
  onCancel: any
  /* defining footer button for modal */
  footer?: Array<any>
  /* defining width for modal */
  width?: number
  /* defining content inside for modal */
  content?: React.JSX.Element | React.FC | string
  /* defining classname style tailwind for modal */
  className?: any
  /* defining function for button delete*/
  handleClickDelete: () => void
  loading?: boolean
}

/**
 * OPTIONAL
 * - style -> any
 * - title -> string
 * - maskClosable -> boolean
 * - footer -> Array button
 * - width -> size modal
 * - className -> classname style tailwind
 */

export function ModalDelete(props: ModalCustom): React.JSX.Element {
  return (
    <Modal
      centered
      style={props.style}
      title={false}
      closable={false}
      maskClosable={props.maskClosable}
      open={props.open}
      onCancel={props.onCancel}
      footer={false}
      className={props.className}
      width={380}
      styles={{
        mask: { backdropFilter: 'blur(4px)' }
      }}
    >
      <div className="w-full flex justify-center">
        <Icons type="DeleteOutlined" size={80} className="!text-danger-color" />
      </div>

      <div className="text-center my-5 text-sm text-black font-normal">
        <p>Are you sure to delete {props.title as any}?</p>
        <p>You can’t undo your action.</p>
      </div>

      <Space className="flex justify-center mt-8">
        <LynxButtons
          disabled={props?.loading || false}
          size="large"
          title="Cancel"
          onClick={props.onCancel}
          typeButton="secondary-600"
          style={{
            width: '150px'
          }}
        />
        <LynxButtons
          disabled={props?.loading || false}
          size="large"
          title="Delete"
          style={{
            width: '150px'
          }}
          onClick={props.handleClickDelete}
        />
      </Space>

      {props.content as any}
    </Modal>
  )
}
