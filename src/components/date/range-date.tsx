import { DatePicker } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import type { Moment } from 'moment'
import moment from 'moment'
import momentGenerateConfig from 'rc-picker/lib/generate/moment'

import './style.scss'

interface CustomDate {
  format?: string
  onChange?: any
  size?: SizeType
  className?: string
  defaultValue?: any
  name?: string
  disabledDate?: any
  allowClear?: any
  value?: string
  //showTime?: any
  disabled?: boolean
}

/**
 * OPTIONAL
 * - format -> "DD-MM-YYYY"
 * - onchange -> function
 * - size -> large | middle | small
 * - className
 */

const LynxDatePicker = DatePicker.generatePicker<Moment>(momentGenerateConfig)

export function LynxDateRange(props: CustomDate): React.JSX.Element {
  const { RangePicker } = DatePicker

  return (
    <RangePicker
      separator="-"
      style={{ width: '100%' }}
      format={props.format || 'DD/MMM/YY'}
      onChange={props.onChange}
      className={`!bg-[#FAFAFA] focus:!bg-[#FAFAFA] hover:!bg-[#FAFAFA] border-none ${props.className}`}
      size={props.size}
      name={props.name}
      allowClear={props.allowClear}
      disabled={props.disabled}
      disabledDate={props.disabledDate}
    />
  )
}
