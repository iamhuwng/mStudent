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
    const contentType = response.headers.get('content-type');
    let errorData;

    if (contentType && contentType.includes('application/json')) {
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { error: `Request failed with status ${response.status} but failed to parse JSON error response.` };
      }
    } else {
       const text = await response.text();
       errorData = { error: `Request failed with status ${response.status}. Server returned non-JSON response: ${text.substring(0, 400)}` };
    }

    // Include reqId in the error message if available
    const message = errorData.error || 'An unknown error occurred';
    const rid = errorData.rid ? ` (Request ID: ${errorData.rid})` : '';
    throw new Error(`${message}${rid}`);
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
