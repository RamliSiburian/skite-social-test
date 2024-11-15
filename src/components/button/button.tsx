/* eslint-disable indent */
import { Button } from 'antd'
import { Icons } from '../icons'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

export interface IButtonCustom {
  onClick?: any
  style?: React.CSSProperties
  className?: string
  title?: string | any
  size?: 'huge' | 'large' | 'small'
  disabled?: boolean
  iconType?: string | null
  typeButton?:
  | 'danger'
  | 'danger-300'
  | 'danger-600'
  | 'warning'
  | 'primary'
  | 'secondary'
  | 'primary-600'
  | 'primary-300'
  | 'primary-900'
  | 'un-border'
  | 'secondary-300'
  | 'secondary-600'
  | 'secondary-900'
  | 'disabled'
  htmlType?: 'button' | 'submit' | 'reset' | undefined
  other?: any
  customIcon?: React.JSX.Element | React.FC | string
  iconStyle?: React.CSSProperties
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
 */
export function LynxButtons(props: IButtonCustom): React.JSX.Element {
  return (
    <Button
      htmlType={props.htmlType}
      onClick={props.onClick}
      shape={props?.shape}
      size="middle"
      style={{
        letterSpacing: '0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '6px 14px',
        width: 'fit-content',
        height: 'fit-content',
        border: props.disabled
          ? '#E4E4E4'
          : props.typeButton === 'primary-300'
            ? '2px solid #00000029'
            : props.typeButton === 'secondary-300'
              ? '1px solid #E7216E'
              : props.typeButton === 'secondary-600'
                ? 'none'
                : props.typeButton === 'secondary-900'
                  ? '0.6px solid #2191FB'
                  : 'none',
        borderRadius: props.typeButton === 'secondary-900' ? '10px' : '8px',
        color: props.disabled
          ? '#9E9D9D'
          : props.typeButton === 'primary-300'
            ? '#353535'
            : props.typeButton === 'primary-600'
              ? '#2191FB'
              : props.typeButton === 'primary-900'
                ? '#FFFFFF'
                : props.typeButton === 'danger'
                  ? '#F33A3A'
                  : props.typeButton === 'danger-300'
                    ? ' #FD0000'
                    : props.typeButton === 'danger-600'
                      ? ' #FFFFFF'
                      : props.typeButton === 'secondary'
                        ? '#E7216E'
                        : props.typeButton === 'secondary-300'
                          ? '#E7216E'
                          : props.typeButton === 'secondary-600'
                            ? '#E7216E'
                            : props.typeButton === 'secondary-900'
                              ? '#2191FB'
                              : props.typeButton === 'un-border'
                                ? '#000000'
                                : props.typeButton === 'disabled'
                                  ? '#2191FB'
                                  : '#FFFFFF',
        background: props.disabled
          ? '#E4E4E4'
          : props.typeButton === 'danger'
            ? '#fef2f2'
            : props.typeButton === 'danger-300'
              ? ' #FD00001A'
              : props.typeButton === 'danger-600'
                ? '#F33A3A'
                : props.typeButton === 'warning'
                  ? 'yellow'
                  : props.typeButton === 'secondary'
                    ? ' #E7216E1A'
                    : props.typeButton === 'secondary-300'
                      ? '#FFFFFF'
                      : props.typeButton === 'secondary-600'
                        ? '#F8F8F8'
                        : props.typeButton === 'secondary-900'
                          ? '#f3faf3'
                          : props.typeButton === 'primary-300'
                            ? '#FFFFFF'
                            : props.typeButton === 'primary-600'
                              ? '#EDF7EF'
                              : props.typeButton === 'primary-900'
                                ? '#2191FB'
                                : props.typeButton === 'un-border'
                                  ? 'none'
                                  : props.typeButton === 'disabled'
                                    ? '#dbdbdb'
                                    : '#2191FB',

        fontWeight: 700,
        boxShadow: 'none',
        fontSize:
          props.size === 'huge'
            ? '18px'
            : props.size === 'large'
              ? '16px'
              : props.size === 'small'
                ? '14px'
                : '12px',
        ...props.style
      }}
      className={props.className}
      disabled={props.disabled}
      icon={
        props.iconType ? (
          <Icons
            type={props.iconType}
            size={
              props.size === 'huge'
                ? 24
                : props.size === 'large'
                  ? 20
                  : props.size === 'small'
                    ? 16
                    : 18
            }
            style={props?.iconStyle}
          />
        ) : null
      }
      {...props.other}
    >
      {/* {props.disabled ? (
        <Spin
          indicator={
            <LoadingOutlined style={{ fontSize: 18, color: '#9D9D9D' }} spin />
          }
        />
      ) : (
        <span className="flex"> */}
      {props.customIcon}
      {props.title ? props.title : ''}
      {/* </span> */}
      {/* )} */}
    </Button>
  )
}
