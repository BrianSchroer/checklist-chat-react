/**
 * Wrap XmlHttpRequest in a promise.
 */
export default class {
  static promise(url, options) {
    const opts = Object.assign(
      { method: 'GET', headers: null, body: null },
      options
    );

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(opts.method, url);

      if (opts.headers) {
        Object.keys(opts.headers).forEach(key => {
          xhr.setRequestHeader(key, opts.headers[key]);
        });
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };

      xhr.onerror = () => reject(xhr.statusText);

      if (opts.body) {
        xhr.body = opts.body;
      }

      xhr.send(opts.body);
    });
  }
}
