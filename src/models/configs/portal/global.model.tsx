import { IModelDefinitions } from "@afx/interfaces/global.iface"

export type IStateGlobal = {
}
export type IActionGlobal = {

}

const globalModels: IModelDefinitions<IStateGlobal, IActionGlobal> = {
  name: 'globalState',
  subscriptions:
    (getStates, useActions) =>
      ({ pathname }) => { },
  model: (put, getStates, useActions) => ({
    state: {
    },
    actions: {}
  })
}

export default globalModels
