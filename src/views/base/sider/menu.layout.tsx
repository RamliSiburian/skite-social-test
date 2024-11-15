import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems'
import Link from 'next/link'
import LoaderImages from '@afx/components/images/image-loader.layout'
import { usePathname } from 'next/navigation'
import { useLynxStore } from '@lynx/store/core'
import { IActionGlobal, IStateGlobal } from '@lynx/models/portal/global.model'
import { Icons } from "@afx/components/icons"

interface IPropsMenus {
  collapsed: boolean
  listMenus: Array<any>
}

export default function Menus(props: IPropsMenus): React.JSX.Element {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const pathname = usePathname()
  useEffect(() => {
    const activeItem = findActiveMenuItem(props.listMenus, pathname)
    const menuCode = activeItem?.menu_code || 'home'
    setActiveMenu(menuCode)
  }, [pathname, props.listMenus, props.collapsed])

  function findActiveMenuItem(items: Array<any>, path: string): any | null {
    for (const item of items) {
      if (item.c_path === path) {
        return item
      }
      if (item.children) {
        const found = findActiveMenuItem(item.children, path)
        if (found) {
          return found
        }
      }
    }
    return null
  }

  function buildMenuItem(a: any) {
    const isActive =
      activeMenu === a.menu_code ||
      a.children?.some((child: any) => child.menu_code === activeMenu)

    const textClass = isActive ? '!text-secondary-color-300' : '!text-white'

    return (
      <div className={`flex flex-row gap-x-2 ${textClass} !items-center `}>
        {typeof a.menu_code === 'string' && (
          <div className={`${props.collapsed && 'flex -mt-1'}`}>
            {
              a?.menu_icon !== null && <Icons type={a?.menu_icon} size={16} />
            }
          </div>
        )}
        {a.parent_id !== null ? (
          <p>{a.menu_name}</p>
        ) : (
          !props.collapsed && <p>{a.menu_name}</p>
        )}
      </div>
    )
  }

  const handleMenuFunction = (menuCode: string) => {
    setActiveMenu(menuCode)
  }

  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys)
  }

  const buildMenuTree = (data: Array<any>): ItemType<MenuItemType>[] =>
    data.map(a => {
      const isLink = typeof a.c_path === 'string'
      const label = isLink ? (
        <Link
          href={`/dashboard/${a.c_path.replace('/dashboard/', '')}`}
          onClick={() => handleMenuFunction(a.menu_code)}
          className="flex items-center "
        >
          <div className="flex flex-row items-center">
            {buildMenuItem(a)}
          </div>
        </Link>
      ) : (
        buildMenuItem(a)
      )

      const propDef: any = {
        className: 'font-Roboto text-md font-semibold',
        key: a.menu_code,
        title: a.menu_name,
        label
      }

      if (Array.isArray(a.children) && a.children.length > 0) {
        return {
          ...propDef,
          children: buildMenuTree(a.children)
        }
      }

      return propDef
    })

  return (
    <Menu
      mode="inline"
      selectedKeys={[activeMenu || '']}
      openKeys={openKeys}
      onOpenChange={handleOpenChange}
      items={buildMenuTree(props.listMenus)}
      className="bg-secondary-color"
    />
  )
}
