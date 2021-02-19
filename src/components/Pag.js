import {Pagination} from "react-bootstrap";
import PropTypes from 'prop-types';
import _ from 'lodash';
const Pag = ({itemsCount, pageSize, onClick, currentPage}) => {
    const pagesCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pagesCount + 1);

   return(
       <div>
           {pagesCount === 1 ? null: <Pagination>
               {pages.map(page => (
                   <Pagination.Item key={page} onClick={() => onClick(page)} active={page === currentPage}>
                       {page}
                   </Pagination.Item>
               ))}
           </Pagination>}
       </div>
   );
}
Pag.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
}
export default Pag;
