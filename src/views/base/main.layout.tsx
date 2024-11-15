/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Badge,
  Breadcrumb,
  Col,
  Layout,
  Popover,
  Row,
  Typography,
  theme
} from 'antd'
import { Icons } from '@afx/components/icons'
import { buildTreeData } from '@afx/utils/parse.util'
import { LynxIHamburger } from '@afx/components/icon-hamburger/icon-hamburger'
import { usePathname, useRouter } from 'next/navigation'
import moment from 'moment'
import { ButtonRounded } from '@afx/components/button/button-rounded'
import LynxStorages from '@afx/utils/storage.util'
import Menus from './sider/menu.layout'
import { useLynxStore } from '@lynx/store/core'
import LoaderImages from '@afx/components/images/image-loader.layout'
import { WindowWidth } from '@afx/components/window-width/window-width'
import { IActionAuth, IStateAuth } from '@lynx/models/main/auth.model'
import ListMenu from '@lynx/mock-data/list-menu.json'
export interface IPortals {
  children: any,
}

const Text = Typography
const { Header, Content, Sider } = Layout
export default function Portal(props: IPortals): React.JSX.Element {
  const windowWidth: number = WindowWidth()
  const pathname = usePathname()
  const router = useRouter()
  const { state, useActions: authState } = useLynxStore<
    IStateAuth,
    IActionAuth
  >('auth')

  useEffect(() => {
    if (pathname === '/dashboard') {
      router.push('/dashboard/home')
    }
  }, [pathname])



  const parts = pathname
    .replace('/dashboard', '')
    .split('/')
    .filter(part => part.length > 0)

  const finParts = parts?.map((text, _) => {
    return {
      title: text
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }
  })
  const [collapsed, setCollapsed] = useState(true)
  const [collapsedWidth, setCollapsedWidth] = useState<number>(80)
  const [listMenus, setListMenus] = useState<Array<any>>([])
  const {
    token: { colorBgContainer }
  } = theme.useToken()


  useEffect(() => {
    const dataTree = buildTreeData(
      ListMenu as any,
      'parent_id',
      'menu_id',
      [
        'menu_code',
        'parent_code',
        'menu_name',
        'c_path',
        'menu_icon',
        'menu_id',
        'parent_id'
      ]
    )
    setListMenus(dataTree)
  }, [ListMenu])

  const logOut = () => {
    LynxStorages.dropAll()
    router.push('/auth/login')
  }
  useEffect(() => {
    if (windowWidth <= 768) {
      setCollapsed(true)
    } else {
    }
  }, [windowWidth])

  useEffect(() => {
    setCollapsed(false)
  }, [])



  return (
    <Layout className="overflow-hidden">
      <Sider
        breakpoint="lg"
        collapsedWidth={collapsedWidth}
        onBreakpoint={broken => {
          if (broken) {
            setCollapsedWidth(0)
          } else {
            setCollapsedWidth(80)
          }
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={286}
        className={`!max-h-screen !bg-secondary-color`}
        style={{
          borderRight: '1px solid #E2E2E2'
        }}
      >
        <Header
          style={{
            display: 'flex',
            justifyContent: collapsed ? 'center' : '',
            padding: collapsed ? '0px' : '0px 0px 0px 30px',
            background: '#2D9CDB'
          }}
        >
          {collapsed ?
            <div onClick={() => setCollapsed(false)} className="cursor-pointer">
              <Badge count={1} size="small" offset={[12, 8]}>
                <Avatar shape="circle" size="default" className="bg-secondary-color-300 border-[2px] border-white" />
              </Badge>
            </div>
            : (
              <div className="flex items-center gap-8 !w-full ">
                <Badge count={1} size="small" offset={[12, 8]}>
                  <Avatar shape="circle" size="default" className="bg-secondary-color-300 border-[2px] border-white" />
                </Badge>
                <p className="text-[30px] font-bold text-white">
                  Belaundry
                </p>
              </div>
            )}
        </Header>
        <div style={{ padding: '0px 24px' }}></div>
        <div
          className="overflow-y-auto !h-full pb-2 pt-2  "
          style={{ maxHeight: 'calc(100vh - 160px)', scrollbarWidth: 'none' }}
        >
          {
            !collapsed && <Typography className="text-2xl font-bold text-white ms-6">Menu</Typography>
          }
          <Menus collapsed={collapsed} listMenus={listMenus} />
        </div>
      </Sider>
      <Layout className="overflow-y-hidden h-screen">
        <Col>
          <Header
            style={{
              background: colorBgContainer
            }}
            className={`p-0 py-3 flex  border-b-[0.5px] border-[#E2E2E2] `}
          >
            {!collapsed && (
              <div className="w-9">
                <LynxIHamburger
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '4px',
                    display: 'flex',
                    justifyContent: 'center',
                    color: 'red'
                  }}
                />
              </div>
            )}
            {collapsedWidth === 0 && collapsed && (
              <div
                className="w-9 ml-4 mt-[-8px] "
                onClick={() => {
                  setCollapsedWidth(80)
                }}
              >
                <Icons type="MenuUnfoldOutlined" size={24} />
              </div>
            )}
            <Row className="w-full px-10 md:ps-4 md:pr-10 items-center">
              <Col lg={18} md={20} sm={18} xs={20}>
                <Breadcrumb
                  separator=" "
                  items={finParts?.map((item, index) => ({
                    ...item,
                    className: 'text-[#303030] text-[40px] !font-bold'
                  }))}
                  className="text-xs md:text-sm"
                />
              </Col>
              <Col lg={6} md={4} sm={6} xs={4} className="flex justify-end gap-3">
                <Icons type="UserOutlined" size={20} />
                <Typography className="text-2xl text-secondary-color-300 font-medium underline">Jhon Doe</Typography>
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              height: '93vh',
              background: '#E7F5FD',
              overflowX: 'hidden',
              overflowY: 'scroll'
            }}
          >
            {props.children}
          </Content>
        </Col>
      </Layout>
    </Layout>
  )
}
