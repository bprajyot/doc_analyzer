import {apiFetch} from './base'

export const riskApi = {
    getAllRiskyDocs: async() => {
        return apiFetch('/risks/report/list')
    },

    getRiskyDocById: async(id) => {
        return apiFetch('/risks/report/<string:risk_id>')
    }
}