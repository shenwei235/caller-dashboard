import * as types from '../mutation_types';

// initial state
const state = {
  tabNav: [],
  currentPageClass: '',
  SYS_VERSION: '1.0',
  CURRENT_USER: {},
  role: [localStorage.getItem("ms_role")] || [''],
  groupDialogVisible: false,
  editDialogVisible: false,
  editDialogData: {}
};

// getters
const getters = {
  tabNav: state => state.tabNav,
  currentPageClass: state => state.currentPageClass,
  SYS_VERSION: state => state.SYS_VERSION,
  CURRENT_USER: state => state.CURRENT_USER,
  roleInfo: state => state.role
};

// actions
const actions = {
  addTabNavItem({
    commit
  }, item) {
    commit(types.ADD_TAB_NAV_ITEM, item);
  },
  removeTabNavItem({
    commit
  }, targetName) {
    commit(types.REMOVE_TAB_NAV_ITEM, targetName);
  },
  setPageClass({
    commit
  }, str) {
    commit(types.SET_CURRENT_PAGE_CLASS, str);
  },
  setCurrentUser({
    commit
  }, obj) {
    commit(types.SET_CURRENT_USER, obj);
  },
  setRoleInfo({
    commit
  }, arr) {
    commit(types.SET_ROLEINFO, arr);
  }
};

// mutations
const mutations = {
  [types.ADD_TAB_NAV_ITEM](state, item) {
    state.tabNav.unshift({
      name: item.name,
      title: item.title,
      params: item.params
    });
  },
  [types.REMOVE_TAB_NAV_ITEM](state, targetName) {
    state.tabNav = state.tabNav.filter(function (tab) {
      return tab.name !== targetName;
    });
  },
  [types.SET_CURRENT_PAGE_CLASS](state, str) {
    state.currentPageClass = str;
  },
  [types.SET_CURRENT_USER](state, obj) {
    state.CURRENT_USER = obj;
  },
  [types.SET_ROLEINFO](state, arr) {
    console.log(arr);
    state.role = arr;
  },
  [types.SET_GROUP_DIALOG_VISIBLE] (state, boolean) {
    state.groupDialogVisible = boolean;
  },
  [types.SET_EDIT_DIALOG_VISIBLE] (state, boolean) {
    state.editDialogVisible = boolean;
  },
  [types.SET_EDIT_DIALOG_DATA] (state, data) {
    state.editDialogData = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
