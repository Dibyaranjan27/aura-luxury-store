import { mockProducts } from '../../client/src/data/mockData.js';

// Strip client string 'id' for clean Mongoose creation
const products = mockProducts.map(({ id, ...rest }) => rest);

export default products;
