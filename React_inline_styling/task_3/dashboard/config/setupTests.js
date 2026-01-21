const { TextEncoder, TextDecoder } = require('util');
require('regenerator-runtime/runtime');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });