/* eslint-disable indent */
import { Button } from 'antd'


export interface IButtonCustomRound {
  onClick?: any
  style?: React.CSSProperties
  className?: string
  title?: string
  size?: 'huge' | 'large' | 'small'
  disabled?: boolean
  iconType?: string
  typeButton?:
  | 'danger'
  | 'danger-300'
  | 'warning'
  | 'primary'
  | 'primary-300'
  | 'primary'
  | 'secondary'
  | 'secondary-300'
  | 'gray'
  | 'un-border'
  htmlType?: 'button' | 'submit' | 'reset' | undefined
  other?: any
  customIcon?: React.JSX.Element | React.FC | string
  shape?: 'default' | 'circle' | 'round'
}

/**
 * REQUIRED
 * - onClick -> function
 *
 * OPTIONAL
 * - title
 * - size -> huge, large, small
 * - iconType -> name icon from antdesign : 'FastForwardOutlined'
 * - typeButton -> danger , warning , primary-600 , primary-300' default : primary
 * - htmlType -> for form on finish "submit | button | reset"
 * - type -> dash border or other
 * - shape -> shape for rounded border or default
 */

export function ButtonRounded(props: IButtonCustomRound): React.JSX.Element {
  return (
    <Button
      htmlType={props.htmlType}
      onClick={props.onClick}
      shape={props.shape}
      size={props.size}
      style={{
        alignItems: 'center',
        border: props.disabled ? '#E4E4E4' : 'none',
        color: props.disabled
          ? '#9E9D9D'
          : props.typeButton === 'primary'
            ? '#2191FB'
            : props.typeButton === 'primary-300'
              ? '#A6B8CA'
              : props.typeButton === 'secondary'
                ? '#D839F2'
                : props.typeButton === 'secondary-300'
                  ? '#F33A3A'
                  : props.typeButton === 'danger-300'
                    ? '#F33A3A'
                    : '#FFFFFF',
        background: props.disabled
          ? '#E4E4E4'
          : props.typeButton === 'danger'
            ? '#FD0000'
            : props.typeButton === 'danger-300'
              ? '#F33A3A0F'
              : props.typeButton === 'warning'
                ? 'yellow'
                : props.typeButton === 'primary'
                  ? '#2191FB'
                  : props.typeButton === 'primary-300'
                    ? '#A6B8CA'
                    : props.typeButton === 'secondary'
                      ? '#D839F2'
                      : props.typeButton === 'gray'
                        ? '#E3E3E3'
                        : props.typeButton === 'un-border'
                          ? 'none'
                          : props.typeButton === 'secondary-300'
                            ? '#FEEBEB'
                            : '#2191FB',

        fontWeight: 600,
        boxShadow: 'none',
        fontSize:
          props.size === 'huge'
            ? '18px'
            : props.size === 'large'
              ? '16px'
              : props.size === 'small'
                ? '12px'
                : '14px',
        ...props.style
      }}
      className={props.className}
      disabled={props.disabled}
      icon={props.customIcon}
      {...props.other}
    ></Button>
  )
}
