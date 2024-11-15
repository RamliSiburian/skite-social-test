import { Space, Typography } from 'antd'
import Image from 'next/image'
import DragDrop from '@lynx/assets/images/imageUpload.svg'
import { useState } from 'react'

interface IDragDrop {
  handleDrop?: any
  inputRef: any
  handleChangeInput: any
  OpenFile: any
}

/**
 *
 * - prefix -> icon in left of textfield
 * - onPressEnter -> when enter keyboard pressed
 *
 */

const { Text } = Typography

export default function LynxDragDrop(props: IDragDrop): React.JSX.Element {
  const [dragActive, setDragActive] = useState<boolean>(false)

  function handleDragLeave(e: any) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  function handleDragOver(e: any) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  function handleDragEnter(e: any) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  return (
    <div
      className="relative w-full border-2 border-dashed border-[#E2E2E2] bg-[#FAFAFA] rounded-xl p-16 text-center"
      onDragEnter={handleDragEnter}
      onDrop={props.handleDrop}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      <input
        placeholder="fileInput"
        ref={props.inputRef}
        type="file"
        multiple={true}
        onChange={props.handleChangeInput}
        accept="image/*"
        style={{
          display: 'none'
        }}
      />
      <Space direction="vertical" align="center" size={0}>
        <Image src={DragDrop} alt="upload" className="mb-2" />
        <Text>Drag & drop image here or</Text>
        <Text
          className="text-[#2191FB] cursor-pointer text-sm"
          onClick={props.OpenFile}
        >
          Upload file
        </Text>
      </Space>
    </div>
  )
}
