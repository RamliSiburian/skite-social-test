import { Input } from 'antd'
import { useState } from 'react'

import './style.scss'
import { SizeType } from 'antd/es/config-provider/SizeContext'

interface IInput {
  prefix?: React.JSX.Element | React.FC
  placeholder?: string
  disabled?: boolean
  standart?: boolean
  maxLength?: number
  rows?: number
  showCount?: boolean
  size?: SizeType
  className?: string
  onChange?: (value: any) => void
}

/**
 *
 * - prefix -> icon in left of textfield
 * - onPressEnter -> when enter keyboard pressed
 *
 */

const { TextArea } = Input

export default function LynxInputArea(props: IInput): React.JSX.Element {
  const { standart, ...others } = props

  const standartLayouts = {
    className: `${
      props?.disabled ? 'custom-disabled-input' : ''
    }'form-input !bg-[#FAFAFA] gap-x-1.5 hover:!bg-[#FAFAFA]' ${
      props.className
    }`,
    style: { border: 'none', fontSize: '17px' },
    styles: {
      input: {
        backgroundColor: '#FAFAFA',
        color: '#9E9D9D',

        border: 'none',
        fontSize: '16px'
      }
    }
  }

  return (
    <TextArea
      {...others}
      {...(typeof standart !== 'boolean' || standart ? standartLayouts : {})}
      rows={props.rows || 2}
      disabled={props.disabled}
      prefix={props.prefix as any}
      size="large"
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  )
}
