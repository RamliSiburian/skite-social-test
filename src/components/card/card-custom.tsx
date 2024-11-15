/* eslint-disable indent */
import { Card } from 'antd'

interface ICardCustom {
  title?: React.JSX.Element | string
  extra?: React.JSX.Element | React.FC | string
  style?: React.CSSProperties
  className?: string
  children?: React.JSX.Element
  cover?: any
  onClick?: () => void
}

/**
 * OPTIONAL
 * - title -> string
 * - children -> a part of content card
 * - extra -> an element or a component
 * - classname -> any
 * - cover -> any
 */
export function CardCustom(props: ICardCustom): React.JSX.Element {
  return (
    <div>
      <Card
        title={props.title}
        cover={props.cover}
        extra={props.extra as any}
        style={props.style}
        className={props.className}
        onClick={props.onClick}
      >
        {props.children}
      </Card>
    </div>
  )
}
