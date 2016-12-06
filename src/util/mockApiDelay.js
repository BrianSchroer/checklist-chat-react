let milliseconds = 1000;

export default class mockApiDelay {
    static getMilliseconds() {
        return milliseconds;
    }

    static setMilliseconds(value) {
        milliseconds = value;
    }
}
