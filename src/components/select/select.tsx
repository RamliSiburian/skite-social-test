import { AutoComplete, Col, Empty, Flex, Row } from 'antd'
import { SizeType } from 'antd/es/config-provider/SizeContext'
import Select, { DefaultOptionType } from 'antd/es/select'
import { Icons } from '../icons'

export type TOptionItems = Array<DefaultOptionType>
export interface IAutoCompleteCustom {
  options: TOptionItems
  placeholder?: string
  loading: boolean
  disabled?: boolean
  onSelect?: (values: string, option: any) => void
  /**
   * - tags -> we can entri multiple label/data and can entri new data
   * - multiple -> we can entri multiple label/data from avaliable data on list
   */
  mode?: 'tags' | 'multiple'
  size?: SizeType
  showSearch?: boolean
  className?: string
  style?: React.CSSProperties
  defaultValue?: string | number | null
  onChange?: (value: number | string | string[], option: any) => void
  onSearch?: (value: string) => void
  onFocus?: (event: any) => void
  filterOption?: (
    input: string,
    option?: { label: string; value: string }
  ) => void
  surfixIcon?: 'hide'
  allowClear?: boolean
  value?: any
  onClear?: () => void
  selected?: Array<number>
  removeIcon?: React.JSX.Element | React.FC | string
  labelRender?: any
}

/**
 * REQUIRED
 * - option -> data in array object "change name or another to view to label"
 * - loading -> boolean
 * OPTIONAL
 * - placeholder -> string
 * - size -> large | middle | small
 */
export function LynxSelect(props: IAutoCompleteCustom): React.JSX.Element {
  const selecteds = Array.isArray(props.selected) ? props.selected : []
  const newOptions = props?.options?.map(item => {
    return {
      ...item,
      disabled:
        selecteds.indexOf(item?.value as any) !== -1 ||
        (typeof item?.disabled === 'boolean' && !!item.disabled)
    }
  })

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  return (
    <Select
      {...props}
      onSearch={props.onSearch}
      aria-disabled
      mode={props.mode}
      placeholder={props.placeholder ? props.placeholder : 'select option'}
      options={
        props.loading
          ? [
            {
              label: (
                <Flex
                  justify="center"
                  align="center"
                  className="p-3"
                  vertical
                  gap={4}
                >
                  <Icons size={28} type="LoadingOutlined" />
                  <p className="text-base-color text-[12px] font-semibold">
                    Loading ...
                  </p>
                </Flex>
              ),
              value: '#LOAD',
              disabled: props.loading
            }
          ]
          : newOptions
      }
      style={{ ...props.style }}
      size={props.size || 'middle'}
      className={`${props.className} bg-[#F8F8F8]`}
      showSearch={props.showSearch}
      onSelect={
        typeof props.onSelect === 'function' ? props.onSelect : undefined
      }
      loading={props.loading}
      notFoundContent={<Empty />}
      disabled={props.disabled}
      filterOption={typeof filterOption === 'function' ? filterOption : false}
      suffixIcon={props?.surfixIcon === 'hide' ? null : undefined}
      allowClear={props.allowClear}
      onClear={props.onClear}
      dropdownStyle={{
        maxHeight: 250,
        overflowX: 'hidden'
      }}
      removeIcon={props?.removeIcon}
      labelRender={props?.labelRender}
    />
  )
}
