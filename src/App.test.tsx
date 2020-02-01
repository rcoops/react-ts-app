import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import App from './App';

describe('AppComponent', () => {

  let appRender: RenderResult;

  beforeAll(() => {
    appRender = render(<App/>);
  });

  describe('stuff happening', () => {

    it('should make things happen', () => {
      const linkElement = appRender.getByText(/Shopping List for Rick/i);
      expect(linkElement).toBeInTheDocument();
    })
  });
});
