import routePaths from './routePaths';

describe('routePaths', () => {

    it('should return the expected "home" value', () => {
        expect(routePaths.home).toEqual('/');
    });

    it('should return the expected "roomView" value', () => {
        expect(routePaths.roomView(12345)).toEqual('/room/12345');
    });
});
