import http from './axios'

export const getMenu = (data) => {
    return http.request({
        url: '/permission/getMenu',
        method: 'POST',
        data
    })
}