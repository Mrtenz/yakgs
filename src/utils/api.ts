/**
 * Generate request data.
 * @param {"POST" | "GET" | "DELETE" | "PATCH"} method
 * @param body
 * @param headers
 * @return {{[key: string]: any}}
 */
const generateData = (
  method: 'POST' | 'GET' | 'DELETE' | 'PATCH',
  body?: any,
  headers?: { [key: string]: string }
): { [key: string]: any } => {
  return {
    method,
    headers: {
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  };
};

/**
 * Execute a HTTP GET request.
 * @param {string} path
 * @param headers
 * @returns {Promise<Data>}
 */
export const get = <Data = any>(
  path: string,
  headers?: { [key: string]: string }
): Promise<Data> => {
  return new Promise<Data>((resolve, reject) => {
    fetch(path, generateData('GET', undefined, headers))
      .then(async response => {
        const json = await response.json();
        if (response.status === 200) {
          return resolve(json);
        }

        reject(new Error(json.message));
      })
      .catch(reject);
  });
};

/**
 * Execute a HTTP POST request.
 * @param {string} path
 * @param body
 * @param headers
 * @returns {Promise<Data>}
 */
export const post = <Data = any>(
  path: string,
  body?: any,
  headers?: { [key: string]: string }
): Promise<Data> => {
  return new Promise<Data>((resolve, reject) => {
    fetch(path, generateData('POST', body, headers))
      .then(async response => {
        const json = await response.json();
        if (response.status === 200) {
          return resolve(json);
        }

        reject(new Error(json.message));
      })
      .catch(reject);
  });
};

/**
 * Execute a HTTP DELETE request.
 * @param {string} path
 * @param body
 * @param headers
 * @return {Promise<Data>}
 */
export const del = <Data = any>(
  path: string,
  body?: any,
  headers?: { [key: string]: string }
): Promise<Data> => {
  return new Promise<Data>((resolve, reject) => {
    fetch(path, generateData('DELETE', body, headers)).then(async response => {
      const json = await response.json();
      if (response.status === 200) {
        return resolve(json);
      }

      reject(new Error(json.message));
    });
  });
};

/**
 * Execute a HTTP PATCH request.
 * @param {string} path
 * @param body
 * @param headers
 * @returns {Promise<Data>}
 */
export const patch = <Data = any>(
  path: string,
  body?: any,
  headers?: { [key: string]: string }
): Promise<Data> => {
  return new Promise<Data>((resolve, reject) => {
    fetch(path, generateData('PATCH', body, headers))
      .then(async response => {
        const json = await response.json();
        if (response.status === 200) {
          return resolve(json);
        }

        reject(new Error(json.message));
      })
      .catch(reject);
  });
};

/**
 * Wrapper for promises to make it easier to catch errors when using async/await.
 *
 * Example usage:
 * const { error, data } = await to(getUsers());
 * @type <T>
 * @param {Promise<T>} promise
 * @returns {Promise<{error?: Error, data?: T}>}
 */
export const to = <T>(promise: Promise<T>): Promise<{ error?: Error; data?: T }> => {
  return promise
    .then(data => ({
      data
    }))
    .catch(error => ({
      error
    }));
};
