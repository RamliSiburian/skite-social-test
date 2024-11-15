import Image from 'next/image'
import { IButtonCustom, LynxButtons } from './button'
import ExportToExcel from '@lynx/assets/images/export.png'

interface IExportToExcel {
  onClick: () => void
  loading: boolean
}

export default function LynxExportToExcel(
  props: IExportToExcel
): React.JSX.Element {
  return (
    <LynxButtons
      disabled={props.loading}
      key={'expToExl'}
      title="Export"
      typeButton="primary-300"
      style={{
        width: '100%',
        fontSize: '12px',
        paddingTop: '6px',
        paddingBottom: '6px'
      }}
      onClick={props.onClick}
      customIcon={
        <Image
          src={ExportToExcel}
          alt="My Icon"
          className="mr-2"
          width={14}
          height={14}
        />
      }
    />
  )
}
