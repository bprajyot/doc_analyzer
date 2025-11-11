const base = 'http://127.0.0.1:5000'

export async function apiFetch(endpoint, option={}){
    const url = `${base}${endpoint}`
    const response = await fetch(url, {
        ...option,
        headers:{
            'Content-Type': 'application/json',
            ...option.headers
        },
    });

    if(!response.ok){
        const errorData = {
            statusCode: response.status,
            message: "An error occured while fetching the data"
        }
        try {
            const errorJson = await response.json()
            if(errorJson.detail)
                errorData.message = errorJson.detail
        } catch {
    
        }
        throw errorData
    }

    return await response.json();
}

export {base}