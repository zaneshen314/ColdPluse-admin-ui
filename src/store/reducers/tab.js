import { createSlice } from '@reduxjs/toolkit'

const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        isCollapse: false,
        tabList: [{
            path: '/home',
            name: 'home',
            label: 'Home',
        }]
    },
    reducers: {
        collapseMenu: (state) => {
            state.isCollapse = !state.isCollapse
        },
        selectMenuList: (state, { payload }) => {
            if (payload.name !== 'home') {
                // 检查是否有重复
                const index = state.tabList.findIndex(item => {
                    return item.name === payload.name
                })
                console.log(index);
                if (index === -1) {
                    console.log('添加');
                    state.tabList.push(payload)
                }

            }
        },
        removeMenuListItem: (state, { payload }) => {
            const index = state.tabList.findIndex(item => item.name === payload.name)
            if (index !== -1) {
                state.tabList.splice(index, 1)
            }
            console.log(state.tabList);

        }
    }
})

export const { collapseMenu, selectMenuList, removeMenuListItem } = tabSlice.actions

export default tabSlice.reducer