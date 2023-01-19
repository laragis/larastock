import MockAdapter from 'axios-mock-adapter';

import axios from 'axios';

const mock = new MockAdapter(axios, { delayResponse: 0, onNoMatch: 'passthrough' });

export default mock;
