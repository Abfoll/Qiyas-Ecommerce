import { restrictTo } from './auth.js';


const isAdmin = restrictTo('admin');

export default isAdmin;
