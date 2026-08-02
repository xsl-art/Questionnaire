import { Pagination } from 'antd';
import { useState, type FC } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
export interface PaginationProps {
  total: number;
}
const Page: FC<PaginationProps> = (props: PaginationProps) => {
  console.log('props', props);
  const { total } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChange = (page: number, pageSize: number) => {
    setCurrent(page);
    setPageSize(pageSize);
    searchParams.set('page', page.toString());
    searchParams.set('pageSize', pageSize.toString());
    navigate({
      pathname,
      search: searchParams.toString(),
    });
  };
  return (
    <div className="pagination">
      <Pagination
        defaultCurrent={1}
        total={total}
        current={current}
        pageSize={pageSize}
        onChange={handleChange}
      />
    </div>
  );
};

export default Page;
