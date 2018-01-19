import React from 'react';
import { EnzymeHelper } from '../testHelpers';

const FakeComponent = () => (
  <div className="fake-component">
    <p className="fake-paragraph">Fake</p>
    <div className="child-type-1" />
    <div className="child-type-1" />
    <div className="child-type-2" />
  </div>
);

function assertExpectedErrorMessage(expectedMessage, callback) {
  try {
    callback();
  } catch (error) {
    expect(error.message).toContain(expectedMessage);
    return;
  }

  throw new Error(`Expected "${expectedMessage}" error was not thrown.`);
}

describe('EnzymeHelper', () => {
  const enzymeHelper = new EnzymeHelper(<FakeComponent />);
  const wrapper = enzymeHelper.shallow();

  it('.find should work with simple selector', () => {
    const found = enzymeHelper.find('div.fake-component');
    expect(found.length).toBe(1);
  });

  it('.find should work with nested selector', () => {
    const found = enzymeHelper.find('div.fake-component > div.child-type-1');
    expect(found.length).toBe(2);
  });

  it('.assertFindCount should return found elements when counts match', () => {
    const found = enzymeHelper.assertFindCount(2, 'div.child-type-1');
    expect(found.length).toBe(2);
  });

  it('.assertFindCount should throw error with expected message when counts differ', () => {
    assertExpectedErrorMessage(
      'Expected 2 element(s) for selector "div.child-type-2", but found 1.',
      () => enzymeHelper.assertFindCount(2, 'div.child-type-2')
    );
  });

  it('.assertNoMatch should not throw error when match is not found', () => {
    enzymeHelper.assertNoMatch('badSelector');
  });

  it('.assertNoMatch should throw error with expected message when match is found', () => {
    assertExpectedErrorMessage(
      'Expected 0 element(s) for selector "p.fake-paragraph", but found 1.',
      () => enzymeHelper.assertNoMatch('p.fake-paragraph')
    );
  });

  it('.findSingle should return found element when match is found', () => {
    const found = enzymeHelper.findSingle('div.child-type-2');
    expect(found.length).toBe(1);
  });

  it('.findSingle should throw error with expected message when no match is found', () => {
    assertExpectedErrorMessage(
      'Expected 1 element(s) for selector "badSelector", but found 0.',
      () => enzymeHelper.findSingle('badSelector')
    );
  });

  it('.findSingle should throw error with expected message when multiple matches are found', () => {
    assertExpectedErrorMessage(
      'Expected 1 element(s) for selector "div.child-type-1", but found 2.',
      () => enzymeHelper.findSingle('div.child-type-1')
    );
  });

  describe('"...in" functions', () => {
    it('.findIn should work with simple selector', () => {
      const found = enzymeHelper.findIn(wrapper, 'div.fake-component');
      expect(found.length).toBe(1);
    });

    it('.findIn should work with nested selector', () => {
      const found = enzymeHelper.findIn(
        wrapper,
        'div.fake-component > div.child-type-1'
      );
      expect(found.length).toBe(2);
    });

    it('.assertFindCountIn should return found elements when counts match', () => {
      const found = enzymeHelper.assertFindCountIn(
        wrapper,
        2,
        'div.child-type-1'
      );
      expect(found.length).toBe(2);
    });

    it('.assertFindCountIn should throw error with expected message when counts differ', () => {
      assertExpectedErrorMessage(
        'Expected 2 element(s) for selector "div.child-type-2", but found 1.',
        () => enzymeHelper.assertFindCountIn(wrapper, 2, 'div.child-type-2')
      );
    });

    it('.assertNoMatchIn should not throw error when match is not found', () => {
      enzymeHelper.assertNoMatchIn(wrapper, 'badSelector');
    });

    it('.assertNoMatchIn should throw error with expected message when match is found', () => {
      assertExpectedErrorMessage(
        'Expected 0 element(s) for selector "p.fake-paragraph", but found 1.',
        () => enzymeHelper.assertNoMatchIn(wrapper, 'p.fake-paragraph')
      );
    });

    it('.findSingleIn should return found element when match is found', () => {
      const found = enzymeHelper.findSingleIn(wrapper, 'div.child-type-2');
      expect(found.length).toBe(1);
    });

    it('.findSingleIn should throw error with expected message when no match is found', () => {
      assertExpectedErrorMessage(
        'Expected 1 element(s) for selector "badSelector", but found 0.',
        () => enzymeHelper.findSingleIn(wrapper, 'badSelector')
      );
    });

    it('.findSingleIn should throw error with expected message when multiple matches are found', () => {
      assertExpectedErrorMessage(
        'Expected 1 element(s) for selector "div.child-type-1", but found 2.',
        () => enzymeHelper.findSingleIn(wrapper, 'div.child-type-1')
      );
    });

    it('.getDebugHtml() should return expected value', () => {
      const debugHtml = enzymeHelper.getDebugHtml();
      expect(debugHtml).toContain('<div className="fake-component">');
    });

    it('.getDebugHtml(wrapper) should return expected value', () => {
      const debugHtml = enzymeHelper.getDebugHtml(wrapper);
      expect(debugHtml).toContain('<div className="fake-component">');
    });
  });

  describe('function call sequence checks', () => {
    const sequenceTestHelper = new EnzymeHelper(<FakeComponent />);
    // ("shallow" not called)
    [
      {
        functionName: 'find',
        callback: () => sequenceTestHelper.find('selector')
      },
      {
        functionName: 'assertFindCount',
        callback: () => sequenceTestHelper.assertFindCount(1, 'selector')
      },
      {
        functionName: 'assertNoMatch',
        callback: () => sequenceTestHelper.assertNoMatch('selector')
      },
      {
        functionName: 'findSingle',
        callback: () => sequenceTestHelper.findSingle('selector')
      },
      {
        functionName: 'getDebugHtml',
        callback: () => sequenceTestHelper.getDebugHtml()
      },
      {
        functionName: 'logDebugHtml',
        callback: () => sequenceTestHelper.logDebugHtml()
      }
    ].forEach(scenario => {
      it(`requires "shallow" before "${scenario.functionName}"`, () => {
        assertExpectedErrorMessage(
          'The "shallow" function must be called before calling this function.',
          scenario.callback
        );
      });
    });
  });

  describe('wrapper type checks', () => {
    const sequenceTestHelper = new EnzymeHelper(<FakeComponent />);
    // ("shallow" not called)
    [
      {
        functionName: 'findIn',
        callback: () => sequenceTestHelper.findIn('x', 'selector')
      },
      {
        functionName: 'assertFindCountIn',
        callback: () => sequenceTestHelper.assertFindCountIn(1, 'x', 'selector')
      },
      {
        functionName: 'assertNoMatchIn',
        callback: () => sequenceTestHelper.assertNoMatchIn('x', 'selector')
      },
      {
        functionName: 'findSingleIn',
        callback: () => sequenceTestHelper.findSingleIn('x', 'selector')
      },
      {
        functionName: 'getDebugHtml',
        callback: () => sequenceTestHelper.getDebugHtml('x')
      },
      {
        functionName: 'logDebugHtml',
        callback: () => sequenceTestHelper.logDebugHtml('x')
      }
    ].forEach(scenario => {
      it(`${
        scenario.functionName
      }" asserts that wrapper is ShallowWrapper`, () => {
        assertExpectedErrorMessage(
          'Passed "wrapper" is not a valid "ShallowWrapper" instance.',
          scenario.callback
        );
      });
    });
  });
});
