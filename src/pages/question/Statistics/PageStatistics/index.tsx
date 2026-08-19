import { useState, type FC } from 'react';
import { PageStatisticsWrapper } from './style';
import { useRequest } from 'ahooks';
import { getStatisticsService } from '@/api';
import { useParams } from 'react-router-dom';
import { Pagination, Spin, Table, Tag, Typography } from 'antd';
import { useComponentInfo } from '@/hooks/useComponentInfo';

const { Title } = Typography;

// 会在答卷数据中出现、需要在统计表格里展示的组件类型
const ANSWER_COMPONENT_TYPES = [
  'questionInput',
  'questionTextarea',
  'questionCheckbox',
  'questionImageUpload',
];

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
        setTotal(res.total);
        setList(res.list);
      },
    }
  );

  const { componentList } = useComponentInfo();

  // 只保留会产生答案数据的组件列
  const answerComponents = componentList.filter(item => ANSWER_COMPONENT_TYPES.includes(item.type));

  const columns = [
    {
      title: '序号',
      key: 'index',
      width: 70,
      align: 'center' as const,
      render: (_: unknown, __: unknown, index: number) => (page - 1) * pageSize + index + 1,
    },
    ...answerComponents.map(item => {
      const { fe_id, title, props = {}, type } = item;
      const colTitle = (props as { title?: string }).title || title;

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
        ellipsis: true,
        render: (value: unknown) => renderCellValue(value, type, props as Record<string, any>),
      };
    }),
  ];

  const dataSource = list.map((i: any) => ({ ...i, key: i._id }));

  const TableElem = (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        scroll={{ x: 'max-content' }}
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '18px' }}>
        <Pagination
          total={total}
          pageSize={pageSize}
          current={page}
          showSizeChanger
          showTotal={t => `共 ${t} 条`}
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

/**
 * 根据组件类型把单元格值格式化成更易读的形式
 * 对于单选/多选，会把存储的 value 映射回选项的 text
 */
function renderCellValue(value: unknown, type: string, props: Record<string, any>) {
  if (value == null || value === '') {
    return <span style={{ color: '#bfbfbf' }}>-</span>;
  }

  if (type === 'questionCheckbox') {
    const values = normalizeValueArray(value);
    if (values.length === 0) {
      return <span style={{ color: '#bfbfbf' }}>-</span>;
    }
    return (
      <span>
        {values.map((v, i) => (
          <Tag key={i} style={{ marginBottom: 4 }}>
            {getOptionText(v, props.list)}
          </Tag>
        ))}
      </span>
    );
  }

  if (type === 'questionImageUpload') {
    const values = normalizeValueArray(value);
    if (values.length === 0) {
      return <span style={{ color: '#bfbfbf' }}>-</span>;
    }
    return <span>已上传 {values.length} 张</span>;
  }

  return <span>{String(value)}</span>;
}

function normalizeValueArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String);
  }
  return String(value)
    .split(', ')
    .filter(v => v !== '');
}

function getOptionText(value: string, options?: Array<{ value: string; text: string }>) {
  return options?.find(opt => opt.value === value)?.text ?? value;
}

export default PageStatistics;
