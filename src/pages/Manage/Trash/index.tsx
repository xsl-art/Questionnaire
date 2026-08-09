import { useState, type FC } from 'react';
import { TrashWrapper } from './style';
import { Empty, Table, Tag, Space, Button, Popconfirm, Spin, message } from 'antd';
import SearchArea from '../../../components/Search/index.tsx';
import { useLoadQuestionListData } from '@/hooks/useLoadQuestionListData';
import Page from '@/components/Page/index.tsx';
import { deleteQuestionService, updateQuestionService } from '@/api/index.ts';
import { useRequest } from 'ahooks';

const Trash: FC = () => {
  const tableColumns = [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      render: (isPublished: boolean) =>
        isPublished ? <Tag color="green">已发布</Tag> : <Tag color="red">未发布</Tag>,
    },
    {
      title: '答卷人数',
      dataIndex: 'answerCount',
    },
    {
      title: '创建时间',
      dataIndex: 'createAT',
    },
  ];

  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true });
  const { list = [], total = 0 } = data;

  //选中ids
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  //恢复选中问卷
  const { loading: restoreLoading, run: handleRestore } = useRequest(
    async () => {
      await Promise.all(
        selectedIds.map(async id => {
          await updateQuestionService(id, { isDeleted: false });
        })
      );
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('恢复成功');
        refresh(); //手动刷新
        setSelectedIds([]);
      },
      onError: () => {
        message.error('恢复失败');
      },
    }
  );

  //批量删除
  const { run: handleDelete } = useRequest(
    async () => {
      await deleteQuestionService(selectedIds);
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功');
        refresh(); //手动刷新
      },
      onError: () => {
        message.error('删除失败');
      },
    }
  );

  return (
    <TrashWrapper>
      <div className="top">
        <div className="title">标题</div>
        <div className="search">
          <SearchArea />
        </div>
      </div>
      <div className="main">
        <div className="list">
          {loading && (
            <div className="loading">
              <Spin />
            </div>
          )}
          {list.length > 0 && (
            <>
              <div className="btns">
                <Space>
                  <Popconfirm
                    title="恢复选中问卷"
                    okText="确认"
                    cancelText="取消"
                    onConfirm={() => handleRestore()}
                  >
                    <Button
                      type="default"
                      disabled={selectedIds.length === 0}
                      loading={restoreLoading}
                    >
                      恢复
                    </Button>
                  </Popconfirm>
                  <Popconfirm
                    title="删除该问卷选项"
                    okText="确认"
                    cancelText="取消"
                    onConfirm={() => handleDelete()}
                  >
                    <Button color="danger" variant="filled">
                      删除
                    </Button>
                  </Popconfirm>
                </Space>
              </div>
              <Table
                columns={tableColumns}
                dataSource={list}
                pagination={false}
                rowKey={(record: any) => record.id}
                rowSelection={{
                  type: 'checkbox',
                  //selectedRowKeys：选中行的id数组
                  //selectedRows：选中行的数组对象
                  onChange: (selectedRowKeys, selectedRows) => {
                    console.log(selectedRowKeys, selectedRows);
                    setSelectedIds(selectedRowKeys as string[]);
                  },
                }}
              />
            </>
          )}
          {!loading && list.length === 0 && <Empty description="暂无问卷" />}
        </div>
      </div>
      <div className="footer">
        <Page total={total} />
      </div>
    </TrashWrapper>
  );
};

export default Trash;
