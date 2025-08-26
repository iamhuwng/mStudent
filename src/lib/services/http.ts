// @module:platform-core @layer:service @owner:studio

type HttpOptions = RequestInit & {
  // custom options here
};

// >>> BEGIN gen:core.http.fetch (layer:service)
async function http<T>(path: string, options?: HttpOptions): Promise<T> {
  const apiPrefix = '/api';
  const url = `${apiPrefix}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    // Example of adding revalidation for Next.js caching
    next: {
        revalidate: 0, // Don't cache by default
        ...options?.next,
    }
  });

  if (!response.ok) {
    // Attempt to parse error response
    let errorData;
    try {
      errorData = await response.json();
    } catch (e) {
      errorData = { message: `Request failed with status ${response.status}: ${response.statusText}` };
    }
    // Include reqId in the error message if available
    const message = errorData.message || 'An unknown error occurred';
    const reqId = errorData.reqId ? ` (Request ID: ${errorData.reqId})` : '';
    throw new Error(`${message}${reqId}`);
  }

  // Handle cases with no content
  if (response.status === 204) {
    return null as T;
  }
  
  try {
    return response.json();
  } catch (error) {
    // Handle cases where response is OK but body is not valid JSON
    throw new Error('Failed to parse JSON response');
  }
}
// <<< END gen:core.http.fetch

export { http };
