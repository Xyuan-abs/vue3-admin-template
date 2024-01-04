// import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  dictionary: [],
  staticDic: {
    a: [{ dicName: 'a', dicCode: 'a' }],
  },
}

const mutations = {
  SET_DICTIONARY: (state, dictionary) => {
    state.dictionary = dictionary
  },
}

const actions = {
  /* 获取用户信息 */
  getDictionary({ commit }) {
    return new Promise((resolve, reject) => {
      commit('SET_DICTIONARY', [])
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
