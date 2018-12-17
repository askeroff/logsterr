// @flow
import React from 'react';
import { PulseLoader } from 'halogenium';

const Spinner = () => (
  <div style={{ textAlign: 'center' }}>
    <PulseLoader color="#4DAF7C" />
  </div>
);

export default Spinner;
