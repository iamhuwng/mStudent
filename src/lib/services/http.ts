// @module:platform-core @layer:service @owner:studio

type HttpOptions = RequestInit & {
  // custom options here
};

// >>> BEGIN gen:platform-core.http-fetch (layer:service)
async function http<T>(path: string, options?: HttpOptions): Promise<T> {
  const apiPrefix = '/api';
  const url = `${apiPrefix}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    // Attempt to parse error response
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: `Request failed with status ${response.status}` };
    }
    throw new Error(errorData.message || 'An unknown error occurred');
  }

  // Handle cases with no content
  if (response.status === 204) {
    return null as T;
  }
  
  return response.json();
}
// <<< END gen:platform-core.http-fetch

export { http };
