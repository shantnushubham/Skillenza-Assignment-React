import React from 'react';
import renderer from 'react-test-renderer';
import App from "../App"

test("When component renders", () => {
  const component = renderer.create(
    <App />
  )
})