import moment from 'moment';

export default class {

    static time(dateString) {
        if (dateString) {
           return moment(dateString).format('h:mm a');
        } else {
            return '';
        }
    }
}
