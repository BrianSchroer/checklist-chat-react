import expect from 'expect';
import React from 'react';
import {shallow} from 'enzyme';
import Header from './Header';

function shallowRender(props) {
    return shallow(<Header {...props}/>);
}

describe('Header', () => {
    let props = {};

    beforeEach(function() {
        props = {isLoading: false, courseCount: 0};
    });

    it('should display LoadingDots when loading', () => {
        props.isLoading = true;
        expect(shallowRender(props).find('LoadingDots').length).toBe(1);
    });

    it('should not display LoadingDots when not loading', () => {
        props.isLoading = false;
        expect(shallowRender(props).find('LoadingDots').length).toBe(0);
    });
});
