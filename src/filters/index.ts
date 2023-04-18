import {CombineFilter} from './filter';
import Github from './github';

const AllFilter = new CombineFilter(...Github);

export default AllFilter;
