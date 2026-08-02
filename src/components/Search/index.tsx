import { useState, type FC } from 'react';
import { Input } from 'antd';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

const { Search } = Input;
const SearchArea: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(() => {
    return searchParams.get('keyword') || '';
  });

  const handleSearch = (value: string) => {
    navigate(`${pathname}?keyword=${value}`);
    setSearchValue('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  return (
    <>
      <Search
        placeholder="请输入搜索内容"
        onSearch={handleSearch}
        onChange={handleChange}
        value={searchValue}
        allowClear
      />
    </>
  );
};

export default SearchArea;
