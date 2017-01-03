import moment from 'moment';

export default class {
    static time(input = '') {

        const isoDateFormatRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}([+-]\d{2}:\d{2})?/g;
        let formatted = input;

        if (input && input.match(isoDateFormatRegex)) {
            formatted = this.dateTimeString(input, 'h:mm a');
        }

        return formatted;
    }

    static isoDateTime(input) {
        return this.dateTimeString(input);
    }

    static dateTimeString(input, formatString) {
        let formatted = input;

        if (input) {
            const testMoment = moment(input);

            if (testMoment.isValid()) {
                const testFormat = testMoment.format(formatString);
                if (testFormat != 'Invalid date') {
                    formatted = testFormat;
                }
            }
        }

        return formatted;
    }
}
