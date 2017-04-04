import renderer from 'react-test-renderer';

/**
 * react-test-renderer snapshot helper methods
 */
export default class {

    /**
     * Create component from JSX
     * @param {JSX} componentJsx (e.g. '<Button />')
     * @returns {object} component object
     */
    static createComponent(componentJsx) {
        return renderer.create(componentJsx);
    }

    /**
     * Create component from JSX and serialize as JSON "snapshot" string.
     * @param {JSX} componentJsx (e.g. '<Button />')
     * @returns {string} JSON string.
     */
    static createSnapshot(componentJsx) {
        return this.createComponent(componentJsx).toJSON();
    }

    /**
     * Create component from JSX, serialize as JSON string, and compare to accepted snapshot.
     * If a snapshot doesn't already exist, one is saved. If a previous snapshot exists
     * and the new snapshot doesn't match, you'll be asked if that's an error or if you want
     * to accept the new snapshot.
     * @param {JSX} componentJsx (e.g. '<Button />')
     */
    static assertMatch(componentJsx) {
        expect(this.createSnapshot(componentJsx)).toMatchSnapshot();
    }
}
