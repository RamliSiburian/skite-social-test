import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import './style.scss'
import { useEffect, useState } from 'react'
import { Icons } from '../icons'

interface ICustomInputNumber {
  value?: number
  onChange?: (v: number) => void
  allowMinus?: boolean
  fraction?: boolean
}

export default function CustomNumberInput(
  props: ICustomInputNumber
): React.JSX.Element {
  const [num, setNum] = useState<number>(0)

  const onChangeValue = (val: number) => {
    const nextVal = num + val
    let vals = !props.allowMinus && nextVal < 0 ? 0 : nextVal
    if (typeof props.onChange === 'function') {
      props.onChange(vals)
    }
    setNum(vals)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    value = value.replace(/^0+(?!$)/, '')

    if (value === '') {
      setNum(0)
      return
    }

    let numValue = parseFloat(value)

    if (isNaN(numValue) || numValue < 0) {
      numValue = 0
    }

    if (!props.fraction) {
      numValue = Math.floor(numValue)
    }

    setNum(numValue)
  }

  useEffect(() => {
    setNum(props.value || 0)
  }, [props.value])

  return (
    <div className="flex items-center">
      <Button
        icon={<Icons type="MinusOutlined" size={14} />}
        shape="circle"
        className="absolute !z-[9999] left-2 bg-[#E7216E] text-white border-none hover:text-white"
        onClick={() => onChangeValue(-1)}
        size="small"
      />
      <Input
        type="number"
        className="w-full bg-[#FEF8FD] h-[30px] rounded-full text-[#E7216E] font-semibold text-base !border-none"
        value={num}
        // onChange={handleChange}
        min="0"
        readOnly
      />
      <Button
        icon={<Icons type="PlusOutlined" size={14} />}
        shape="circle"
        className="absolute right-2 !z-[9999] bg-[#E7216E] text-white border-none hover:text-white"
        onClick={() => onChangeValue(1)}
        size="small"
      />
    </div>
  )
}
