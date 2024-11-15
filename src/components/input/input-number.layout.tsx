import React from 'react'
import { Flex, InputNumber, Space, Tooltip } from 'antd'

interface IInputNumber {
  prefix?: React.JSX.Element | React.FC
  addOnBefore?: React.JSX.Element | React.FC
  placeholder?: string
  disabled?: boolean
  standart?: boolean
  maxLength?: number
  onPressEnter?: (value: any) => void
  onChange?: (event: any) => void
  type?: any
  value?: number | string | undefined
  defaultValue?: number
  className?: string
  suffix?: React.JSX.Element | React.FC
  controls?: boolean
  max?: number
  exclamation?: string | React.ReactNode
}

export default function LynxInputNumber(
  props: IInputNumber
): React.JSX.Element {
  const { standart, ...others } = props
  const standartLayouts = {
    className: 'form-input w-full gap-x-1.5',
    style: { width: '100%' },
    styles: {
      input: {
        backgroundColor: '#FAFAFA',
        color: '#353535',
        border: '1px solid #FAFAFA',
        fontSize: '16px'
      }
    }
  }

  return (
    <div className="w-full h-fit relative">
      {props.exclamation && (
        <Tooltip title={props.exclamation}>
          <Flex
            justify="center"
            align="center"
            className="w-[16px] h-[16px] text-yellow-600 bg-yellow-600 bg-opacity-10 absolute p-[6px] rounded-full border-stone-300 border-[0.5px] -top-1.5 -right-1 z-[100]"
          >
            <p className="font-semibold text-[11px]">!</p>
          </Flex>
        </Tooltip>
      )}
      <InputNumber
        {...others}
        defaultValue={props.defaultValue}
        value={props.value}
        size="large"
        prefix={props.prefix as any}
        addonBefore={props.addOnBefore as any}
        addonAfter={props.suffix as any}
        {...(typeof standart !== 'boolean' || standart
          ? standartLayouts
          : { className: 'w-full' })}
        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        parser={value => value!.replace(/\$\s?|(\,*)/g, '')}
        onPressEnter={(v: any) => props.onPressEnter?.(v.target.value)}
        disabled={props.disabled}
        placeholder={props.placeholder}
        className={`!bg-[#FAFAFA] focus:!bg-[#FAFAFA] hover:!bg-[#FAFAFA] border-none ${props.className}`}
        controls={props?.controls}
        min={0}
        max={props?.max || undefined}
        maxLength={15}
        suffix={false}
      />
    </div>
  )
}
