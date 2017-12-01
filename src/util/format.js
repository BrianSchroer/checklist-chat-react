const localeTimeStringOptions = {
  hour: 'numeric',
  minute: '2-digit'
};

export default class {
  static time(input = '') {
    const isoDateFormatRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}([+-]\d{2}:\d{2})?/g;
    let formatted = input;

    if (input && input.match(isoDateFormatRegex)) {
      const milliseconds = Date.parse(input);
      if (milliseconds) {
        const dt = new Date(milliseconds);
        const localeString = dt.toLocaleTimeString(
          'en-US',
          localeTimeStringOptions
        );
        formatted = localeString.toLowerCase();
      }
    }

    return formatted;
  }

  static isoDateTimeString(input) {
    let formatted = input;

    if (input) {
      const milliseconds = Date.parse(input);
      if (milliseconds) {
        formatted = new Date(milliseconds).toISOString();
      }
    }

    return formatted;
  }
}
