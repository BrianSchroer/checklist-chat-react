const enzymeHelper = class {

    static nestedFind(wrapper, selector) {
        const selectors = selector.split('>').map(node => node.trim());
        let parent = wrapper;
        let found = [];

        for (let i = 0; i < selectors.length; i++) {
            found = parent.find(selectors[i]);
            if (!found.length) {
                break;
            }
        }

        return found;
    }

    static findSingle(wrapper, selector) {
        const findArray = enzymeHelper.nestedFind(wrapper, selector);

        if (findArray.length != 1) {
            throw(`expected 1 find for selector "${selector}", but found ${findArray.length}.`);
        }

        return findArray.first();
    }
};

export default enzymeHelper;
