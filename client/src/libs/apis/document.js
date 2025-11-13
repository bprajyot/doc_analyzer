import { base, apiFetch } from './base'

export const documentApi = {
    uploadDoc: async (file) => {
        const data = new FormData();
        data.append('file', file);

        // apiFetch already handles errors and returns parsed JSON
        return await apiFetch('/documents/upload', {
            method: 'POST',
            body: data,
            headers: {},
        });
    },

    getAllDocs: async () => {
        return apiFetch('/documents/report/list')
    },

    getDocById: async (id) => {
        return apiFetch(`/documents/report/${id}`)
    },
}