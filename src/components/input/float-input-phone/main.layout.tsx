/* eslint-disable prefer-const */
import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { Button, Input, InputRef } from 'antd'
import './style.scss'
import { Icons } from '@afx/components/icons'
import {
  CountryIso2,
  CountrySelector,
  usePhoneInput
} from 'react-international-phone'

export interface IFloatInputPhone {
  label?: string
  size?: 'middle' | 'small' | 'large'
  required?: boolean
  value?: string
  className?: string
  style?: CSSProperties
  prefixIcon?: string | React.JSX.Element | React.ReactNode
  onChange?: (data: string) => void
  onEnter?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeDialcode?: (dialcode: string) => void
  addonAfter?: React.ReactNode
  suffix?: React.ReactNode
}

export default function FloatInputPhone(
  props: IFloatInputPhone & { [P: string]: any }
) {
  const [focus, setFocus] = useState(false)
  const [text, setText] = useState('')
  const [dialcode, setDialcode] = useState<string>()
  let { label, value, placeholder, type, required } = props

  if (!placeholder) placeholder = label

  useEffect(() => {
    props.onChangeDialcode?.(dialcode as string)
  }, [dialcode])

  useEffect(() => {
    setText(value as any)
  }, [value])

  const isOccupied = focus

  const labelClass = 'label as-label focused'

  const requiredMark = required ? <span className="text-danger">*</span> : null

  const phoneInput = usePhoneInput({
    defaultCountry: 'id',
    value: props.value,
    onChange: data => {
      if (props.onChange) {
        setDialcode(data.country.dialCode)
        props.onChange(data.phone)
      }
    }
  })

  const inputRef = useRef<InputRef>(null)

  // Need to reassign inputRef because antd provides not the default ref
  useEffect(() => {
    if (phoneInput.inputRef && inputRef.current?.input) {
      phoneInput.inputRef.current = inputRef.current.input
    }
  }, [inputRef, phoneInput.inputRef])

  return (
    <div
      className="float-label w-full"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      <Input
        ref={inputRef}
        style={props.style}
        className={`float-input ${props.className || ''}`}
        size={props.size}
        autoComplete="off"
        autoCorrect="off"
        autoFocus={false}
        type={type}
        addonAfter={props.addonAfter}
        suffix={props?.suffix}
        styles={{
          input: {
            paddingLeft: typeof props.prefixIcon === 'string' ? 34 : 12
          }
        }}
        value={phoneInput.phone}
        onPressEnter={props.onEnter as any}
        onChange={phoneInput.handlePhoneValueChange}
        prefix={
          <CountrySelector
            selectedCountry={phoneInput.country.iso2 as CountryIso2}
            onSelect={country => phoneInput.setCountry(country.iso2)}
            renderButtonWrapper={({ children, rootProps }) => (
              <Button
                size="small"
                {...rootProps}
                className="mt-1 h-6 bg-button-country border-none !rounded-md !w-[55px]"
              >
                <div className="flex items-center">
                  <span>{children}</span>
                  <span className="rounded-lg text-xs ml-1">
                    {phoneInput.country.iso2.toUpperCase()}
                  </span>
                </div>
              </Button>
            )}
            dropdownStyleProps={{
              style: {
                top: '36px', // Ensure dropdown appears below the input
                maxHeight: '200px',
                overflowY: 'auto',
                zIndex: 9999, // Adjust zIndex if needed
                position: 'absolute', // Ensure dropdown is absolutely positioned
                background: '#FFFFFF',
                border: '2x solid #F5F5F5',
                padding: '4px 20px',
                fontSize: '12px'
              }
            }}
          />
        }
      />
    </div>
  )
}
