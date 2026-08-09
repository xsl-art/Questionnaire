import { type FC } from 'react';
import { ListWrapper } from './style.ts';
import QuestionCard from '@/components/QuestionCard/index.tsx';
import SearchArea from '@/components/Search/index.tsx';
import Page, { type PaginationProps } from '../Page/index.tsx';

export interface ListProps {
  id: string;
  title: string;
  isPublished: boolean;
  isStared: boolean;
  answerCount: number;
  createAT: string;
}
interface ListComponentProps {
  list: ListProps[];
  option: PaginationProps;
}

const List: FC<ListComponentProps> = ({ list, option }) => {
  return (
    <ListWrapper>
      <div className="top">
        <div className="title">标题</div>
        <div className="search">
          <SearchArea />
        </div>
      </div>
      <div className="main">
        <div className="list">
          {list.length > 0 && list.map(item => <QuestionCard key={item.id} {...item} />)}
        </div>
      </div>
      <div className="footer">
        <Page {...option} />
      </div>
    </ListWrapper>
  );
};

export default List;
