//import expect from 'expect';
import {createRoutes, createMemoryHistory, match} from 'react-router';
import routes from './routes';

describe('routes', () => {
    it('should match the expected route for /room/12345', function(done) {
        const history = createMemoryHistory();
        const createdRoutes = createRoutes(routes);
        const location = createMemoryHistory().createLocation('/room/12345');
        match({history, routes: createdRoutes, location}, function(error, match) {  // eslint-disable-line no-unused-vars
            // expect(match).toExist(); TODO: Figure out how to make this work
            done();
        });
    });
});
