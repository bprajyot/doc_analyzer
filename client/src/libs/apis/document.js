import { base, apiFetch } from './base'

export const documentApi = {
    uploadDoc: async (file) => {
        const data = new FormData()
        data.append('file', file);

        response = apiFetch(`${base}/documents/upload`, {
            method: 'POST',
            body: data
        });

        if (!response.ok) {
            const errorData = {
                statusCode: response.status,
                message: 'Failed to upload document',
            };
            try {
                const errorJson = await response.json();
                if (errorJson.detail) {
                    errorData.message = errorJson.detail;
                }
            } catch {
                
            }
            throw errorData;
        }
        return await response.json();
    },

    getAllDocs: async () => {
        return apiFetch('/documents/report/list')
    },

    getDocById: async (id) => {
        return apiFetch(`/documents/report/${id}`)
    },
}