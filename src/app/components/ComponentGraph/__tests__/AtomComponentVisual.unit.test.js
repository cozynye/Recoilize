import React, {useState} from 'react';
import AtomComponentVisualContainer from '../AtomComponentContainer';
import AtomComponentVisual from '../AtomComponentVisual';
import {render, cleanup, generateStore, screen} from '../../../tests/testing';
import '@testing-library/jest-dom/extend-expect';

// this is our mock state that we will use to run our tests
import {snapshotHistoryMock} from '../../../../../mock/state-snapshot';

afterEach(cleanup);

// NOTE: in order to run these tests, comment out lines 127 to 131 in the atom component visual test (svgContainer.call with zoom transform)
// jest does not work well with d3 in this instance

it('Renders the component', () => {
  // generate store
  const store = generateStore({ snapshot: snapshotHistoryMock})
  // need to include a div with class component because AtomComponentVisual needs it to render
  const componentClassDiv = document.createElement('div');
  componentClassDiv.className = 'Component';
  document.body.appendChild(componentClassDiv);

  const canvas = document.createElement('div');
  canvas.id = 'canvas';
  document.body.appendChild(canvas)

  render(
    // props are all based on snapshot history mock data of mock tic tac toe game
    <AtomComponentVisual
      componentAtomTree={snapshotHistoryMock['snapshotHistory'][0]['componentAtomTree']}
      cleanedComponentAtomTree={snapshotHistoryMock['cleanComponentAtomTree']}
      atoms={['playStart', 'square-0', 'square-1', 'square-2', 'square-3', 'square-4', 'square-5', 'square-6', 'square-7', 'square-8', 'currentPlayerState']}
      selectors={['gameEndSelector']}
      selectedRecoilValue={['square-0', 'atom']}
    />,
    {providers: { store }}
  );
});

xit('renders & matches snapshot - no props', () => {
  const {asFragment} = render(<AtomComponentVisualContainer />);
  expect(asFragment()).toMatchSnapshot();
});

xit('renders & matches snapshot - componetAtomTree props', () => {
  const {asFragment} = render(
    <AtomComponentVisualContainer
    />,
  );
  expect(asFragment()).toMatchSnapshot();
});
