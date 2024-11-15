import { ArrowLeftOutlined } from '@ant-design/icons'

interface IButtonBack {
  onClick?: () => void
}

export default function ButtonBack(props: IButtonBack): React.JSX.Element {
  return (
    <div
      onClick={props.onClick}
      className="cursor-pointer w-7 h-7 rounded-full flex items-center justify-center bg-base-color"
    >
      <ArrowLeftOutlined className="!text-white text-sm" />
    </div>
  )
}
