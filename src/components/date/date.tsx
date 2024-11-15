import { DatePicker } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import type { Moment } from 'moment'
import momentGenerateConfig from 'rc-picker/lib/generate/moment'

import './style.scss'

interface CustomDate {
  format?: string
  onChange?: any
  size?: SizeType
  className?: string
  defaultValue?: any
  name?: string
  disabledDate?: (moment: Moment) => boolean
  allowClear?: any
  value?: string
  showTime?: boolean
  disabled?: boolean
  placeholder?: string

}

/**
 * OPTIONAL
 * - format -> "DD-MM-YYYY"
 * - onchange -> function
 * - size -> large | middle | small
 * - className
 */

const LynxDatePicker = DatePicker.generatePicker<Moment>(momentGenerateConfig)

export function LynxDates(props: CustomDate): React.JSX.Element {
  return (
    <LynxDatePicker
      {...props}
      style={{ width: '100%' }}
      format={props.format || 'DD/MMM/YY'}
      placeholder={props?.placeholder || "Pick date"}
      onChange={props.onChange}
      className={`!bg-[#FAFAFA] focus:!bg-[#FAFAFA] hover:!bg-[#FAFAFA] border-none ${props.className}`}
      size={props.size}
      name={props.name}
      disabledDate={props.disabledDate}
      disabledTime={props.disabledDate as any}
      allowClear={props.allowClear}
      disabled={props.disabled}
      showTime={props?.showTime}
    />
  )
}
