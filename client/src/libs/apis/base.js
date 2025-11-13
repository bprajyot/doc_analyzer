const base = 'http://127.0.0.1:5000'

export async function apiFetch(endpoint, option = {}) {
  const url = `${base}${endpoint}`;

  const headers = option.body instanceof FormData
    ? option.headers
    : { 'Content-Type': 'application/json', ...option.headers };

  const response = await fetch(url, { ...option, headers });

  // Handle non-2xx responses
  if (!response.ok) {
    const errorData = {
      statusCode: response.status,
      message: "An error occurred while fetching the data",
    };
    try {
      const errorJson = await response.json();
      if (errorJson.detail) errorData.message = errorJson.detail;
    } catch {}
    throw errorData;
  }

  // Try to parse JSON, but don't break if response is empty
  try {
    return await response.json();
  } catch {
    return {}; // in case backend returns no JSON body
  }
}


export { base }