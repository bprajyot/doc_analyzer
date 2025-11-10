import {apiFetch} from './base'

export const statsApi = {
    getStats: async() => {
        return apiFetch('/documents/stats')
    }
}