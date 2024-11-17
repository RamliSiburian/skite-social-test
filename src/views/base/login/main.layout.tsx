import { Col, Form, Input, Row, Spin, notification } from 'antd'
import { LynxButtons } from '@afx/components/button/button'
import { LynxForm, LynxFormItem } from '@afx/components/form/form.layout'
import RegexText from '@afx/utils/regex.util'
import { useRouter } from 'next/navigation'
import { useLynxStore } from '@lynx/store/core'
import { IActionAuth, IStateAuth } from '@lynx/models/main/auth.model'
import { useLayoutEffect } from 'react'
import LynxStorages from '@afx/utils/storage.util'
import { IPayloadLogin } from "@afx/interfaces/main/auth.iface"

export default function Login(): React.JSX.Element {
  const router = useRouter()
  const { isLoading, useActions } = useLynxStore<IStateAuth, IActionAuth>(
    'auth'
  )
  const [form] = Form.useForm<IPayloadLogin>()
  const LOADINGS = isLoading('loginAdmin') || false

  const token = LynxStorages.getItem('@UTOKEN').data[0]

  const handleLogin = () => {
    return form
      .validateFields()
      .then(values => {
        useActions<'loginAdmin'>(
          'loginAdmin',
          [
            values,
            () => {
              router.replace('/dashboard')
              setTimeout(() => {
                router.replace(`${window.location.origin}/dashboard`)
              }, 300)
            }
          ],
          true
        )
      })
      .catch(er => {
        return notification.warning({
          message: 'Required Form',
          description: er?.errorFields?.[0]?.errors
        })
      })
  }

  useLayoutEffect(() => {
    if (typeof token === 'string' || token !== null) {
      router.replace('/dashboard')
    } else {
    }
  }, [])

  return (
    <>
      <Row className="h-screen">
        <Col xs={24} md={24} lg={24} className="mt-10 md:mt-0 lg:mt-0">
          <Spin spinning={false}>
            <div className="flex justify-center">
              <div className="w-full xl:w-1/2 px-[56px] sm:px-[100px] md:px-[56px] lg:px-[100px] xl:px-[156px]  2xl:mt-[80px] lg:mt-[32px]">
                <div className="text-center">
                  <p className="text-base-color text-3xl font-extrabold mt-[0px] sm:mt-[0px]  md:mt-[72px]  2xl:mt-[100px]">
                    Log in
                  </p>
                  <p
                    className="text-sm font-normal mt-8 sm:mt-4 md:mt-8 "
                    style={{ color: '#989898' }}
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry
                  </p>
                </div>
                <LynxForm
                  form={form}
                  name="validateOnly"
                  layout="vertical"
                  autoComplete="off"
                  className="mt-8"
                >
                  <LynxFormItem
                    name="email"
                    label="E-mail"
                    rules={[
                      { required: true },
                      {
                        pattern: RegexText.email(),
                        message: 'Wrong format of email'
                      }
                    ]}
                  >
                    <Input
                      placeholder="name@gmail.com"
                      size="large"
                      disabled={LOADINGS}
                      className="bg-[#989898]/10 h-12 rounded-[12px] border-none"
                      type="email"
                      style={{ padding: '18px', margin: '0px' }}
                    />
                  </LynxFormItem>
                  <LynxFormItem
                    name="password"
                    label="Password"
                    rules={[{ required: true }]}
                  // help={
                  //   <p className="text-[10px] font-normal text-[#989898]">
                  //     Characters must be min 8 ,have at least capital letters,
                  //     lowercase letters & numbers
                  //   </p>
                  // }
                  >
                    <Input.Password
                      size="small"
                      disabled={LOADINGS}
                      className="bg-[#989898]/10 h-12 rounded-[12px] border-none"
                      onPressEnter={handleLogin}
                      style={{ padding: '0px 18px', margin: '0px' }}
                    />
                  </LynxFormItem>
                  <LynxFormItem>
                    <LynxButtons
                      size="huge"
                      title="LOGIN"
                      className="bg-base-color flex justify-center py-3"
                      disabled={LOADINGS}
                      iconType={LOADINGS ? 'LoadingOutlined' : ''}
                      style={{
                        width: '100%',
                        marginTop: '12px',
                        fontSize: '14px',
                        padding: '12px 0px'
                      }}
                      onClick={handleLogin}
                    />
                  </LynxFormItem>
                </LynxForm>
              </div>
            </div>
          </Spin>
        </Col>
      </Row>
    </>
  )
}
