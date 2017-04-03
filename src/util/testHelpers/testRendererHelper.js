import renderer from 'react-test-renderer';

export default class {

    static renderToJson(component) { 
        return renderer.create(component).toJSON();
    }

    static expectSnapshotMatch(component) {
        expect(this.renderToJson(component)).toMatchSnapshot(); 
    }
}