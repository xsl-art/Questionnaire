import { useState, type FC } from 'react';
import { PageStatisticsWrapper } from './style';
import { useRequest } from 'ahooks';
import { getStatisticsService } from '@/api';
import { useParams } from 'react-router-dom';
import { Pagination, Spin, Table, Typography } from 'antd';
import { useComponentInfo } from '@/hooks/useComponentInfo';

const { Title } = Typography;

type PropsType = {
  selectedComponentId: string;
  setSelectedComponentId: (id: string) => void;
  setSelectedComponentType: (type: string) => void;
};
const PageStatistics: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props;
  const { id = '' } = useParams();
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const { loading } = useRequest(
    async () => {
      const res = await getStatisticsService(id, {
        page,
        pageSize,
      });
      return res;
    },
    {
      refreshDeps: [id, page, pageSize],
      onSuccess: res => {
        console.log(res);
        setTotal(res.total);
        setList(res.list);
      },
    }
  );

  const { componentList } = useComponentInfo();
  const columns = componentList.map(item => {
    const { fe_id, title, props = {}, type } = item;

    const colTitle = props!.title || title;

    return {
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setSelectedComponentId(fe_id);
            setSelectedComponentType(type);
          }}
        >
          <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    };
  });

  const dataSource = list.map((i: any) => ({ ...i, key: i._id }));
  const TableElem = (
    <>
      <Table columns={columns} dataSource={dataSource} pagination={false}></Table>
      <div style={{ textAlign: 'center', marginTop: '18px' }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          onChange={page => setPage(page)}
          onShowSizeChange={(page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </>
  );

  return (
    <PageStatisticsWrapper>
      <Title level={3}>答卷数量: {!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {!loading && TableElem}
    </PageStatisticsWrapper>
  );
};

export default PageStatistics;
