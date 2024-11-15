import { Input } from 'antd'

interface IInput {
  prefix?: React.JSX.Element | React.FC | any
  suffix?: React.JSX.Element | React.FC
  addonBefore?: React.JSX.Element | React.FC | any
  placeholder?: string
  disabled?: boolean
  standart?: boolean
  maxLength?: number
  onPressEnter?: (value: any) => void
  onChange?: (event: any) => void
  type?: any
  className?: string
}

/**
 *
 * - prefix -> icon in left of textfield
 * - suffix -> icon in right of textfield
 * - onPressEnter -> when enter keyboard pressed
 *
 */

export default function LynxInputPhone(props: IInput): React.JSX.Element {
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
    <Input
      {...others}
      {...(typeof standart !== 'boolean' || standart
        ? standartLayouts
        : { styles: { input: { textAlign: 'left' } } })}
      disabled={props.disabled}
      addonBefore={props.addonBefore as any}
      prefix={props.prefix as any}
      size="large"
      placeholder={props.placeholder || 'Enter Phone Number'}
      onPressEnter={(v: any) => props.onPressEnter?.(v.target.value)}
      // type='number'
      suffix={props.suffix as any}
      className="hide-arrows"
      min={0}
      maxLength={12}
    />
  )
}
