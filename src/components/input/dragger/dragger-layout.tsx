import React from 'react';
import { FileFilled } from '@ant-design/icons';
import { Button, Row, Upload } from 'antd';

const { Dragger } = Upload;

interface IFileDraggerCustom {
  name: string
  fileList: any
  handleChange: (info: any, key: string) => void
  validator: (file: File) => void
}

const FileDraggerCustom = (props: IFileDraggerCustom): React.JSX.Element => (
  <Dragger
    name={props?.name}
    maxCount={1}
    beforeUpload={props?.validator}
    fileList={props?.fileList[props?.name] || []}
    onChange={(info) => props?.handleChange(info, props?.name)}
  >
    <Row className='flex justify-between items-center'>
      <Row className='flex items-center gap-2'>
        <FileFilled style={{ color: '#AED5FA', fontSize: '30px' }} />
        <p className="text-[12px] xl:text-[17px] text-[#989898]">Drag & Drop file here or</p>
      </Row>
      <p className="text-[15px] text-[#2191FB] font-bold">
        <Button className='rounded-md text-[12px] xl:text-[14px]' type='primary'>Browse</Button>
      </p>
    </Row>
  </Dragger>
);

export default FileDraggerCustom;