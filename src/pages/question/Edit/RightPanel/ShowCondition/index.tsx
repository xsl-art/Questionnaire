import { type FC, useState } from 'react';
import { Select, Radio, Button, Input, Space, Card, Typography, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useComponentInfo } from '@/hooks/useComponentInfo';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { useParams } from 'react-router-dom';
import {
  componentConditionFields,
  getOperatorsByType,
  operatorNeedsTargetValue,
} from '@/components/QuestionComponents/conditionFields';
import type {
  ConditionRule,
  ConditionGroup,
  ConditionOperator,
} from '@/components/QuestionComponents/type';
import { updateVisibleCondition } from '@/store/componentsStore/componentsReducer';
import { checkCircularConditionForGroup } from '@/utils/circularConditionCheck';
import { updateVisibleConditionService } from '@/api';

const { Text } = Typography;

// 初始化空条件组
const createEmptyGroup = (): ConditionGroup => ({
  id: nanoid(),
  logic: 'AND',
  rules: [],
});

// 初始化空规则
const createEmptyRule = (): ConditionRule => ({
  id: nanoid(),
  sourceId: '',
  sourceField: '',
  operator: 'eq',
  targetValue: '',
});

const ShowCondition: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { selectedId, selectedComponent, componentList, adjacencyCache } = useComponentInfo();

  // 本地状态管理条件组，组件因 key 变化重新挂载时从当前选中组件初始化
  const [conditionGroup, setConditionGroup] = useState<ConditionGroup>(
    () => selectedComponent?.visibleCondition || createEmptyGroup()
  );

  // 过滤出支持条件触发的组件（排除当前选中的组件自己）
  const triggerOptions = componentList.filter(
    item => item.type in componentConditionFields && item.fe_id !== selectedId
  );

  // 添加规则
  const addRule = () => {
    setConditionGroup(prev => ({
      ...prev,
      rules: [...prev.rules, createEmptyRule()],
    }));
  };

  // 删除规则
  const deleteRule = (ruleId: string) => {
    setConditionGroup(prev => ({
      ...prev,
      rules: prev.rules.filter(rule => rule.id !== ruleId),
    }));
  };

  // 更新规则
  const updateRule = (ruleId: string, updates: Partial<ConditionRule>) => {
    setConditionGroup(prev => ({
      ...prev,
      rules: prev.rules.map(rule => (rule.id === ruleId ? { ...rule, ...updates } : rule)),
    }));
  };

  // 切换 AND/OR
  const toggleLogic = (logic: 'AND' | 'OR') => {
    setConditionGroup(prev => ({ ...prev, logic }));
  };

  // 保存到服务端 + Redux
  const handleSave = async () => {
    if (!id) {
      message.error('问卷 ID 不存在');
      return;
    }

    // 过滤掉未填写完整的规则
    const validRules = conditionGroup.rules.filter(rule => {
      if (!rule.sourceId || !rule.sourceField || !rule.operator) return false;
      if (operatorNeedsTargetValue(rule.operator)) {
        return rule.targetValue !== '';
      }
      return true;
    });

    const finalGroup: ConditionGroup | null =
      validRules.length > 0 ? { ...conditionGroup, rules: validRules } : null;

    // 前端本地先做一轮增量循环引用检测
    const cycleResult = checkCircularConditionForGroup(
      componentList,
      selectedId,
      finalGroup,
      adjacencyCache
    );
    if (cycleResult.hasCycle) {
      message.error(`保存失败：条件显示存在循环引用（${cycleResult.cycle?.join(' → ')}）`);
      return;
    }

    try {
      // 服务端增量循环引用检测并持久化
      await updateVisibleConditionService(id, selectedId, finalGroup);
      message.success('保存成功');

      dispatch(
        updateVisibleCondition({
          fe_id: selectedId,
          visibleCondition: finalGroup,
        })
      );
    } catch {
      // axios 拦截器已弹出 message.error，这里只需阻止本地状态更新
    }
  };

  return (
    <div style={{ padding: '12px 0' }}>
      {/* AND/OR 逻辑切换 */}
      {conditionGroup.rules.length > 1 && (
        <Radio.Group
          value={conditionGroup.logic}
          onChange={e => toggleLogic(e.target.value)}
          style={{ marginBottom: 16 }}
        >
          <Radio.Button value="AND">满足所有条件</Radio.Button>
          <Radio.Button value="OR">满足任一条件</Radio.Button>
        </Radio.Group>
      )}

      {/* 规则列表 */}
      <Space orientation="vertical" style={{ width: '100%' }} size="middle">
        {conditionGroup.rules.map((rule, index) => (
          <RuleItem
            key={rule.id}
            rule={rule}
            index={index}
            triggerOptions={triggerOptions}
            onChange={updates => updateRule(rule.id, updates)}
            onDelete={() => deleteRule(rule.id)}
          />
        ))}
      </Space>

      {/* 添加规则按钮 */}
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={addRule}
        style={{ width: '100%', marginTop: 16 }}
      >
        添加条件规则
      </Button>

      {/* 保存按钮 */}
      <Button type="primary" onClick={handleSave} style={{ width: '100%', marginTop: 12 }}>
        保存条件配置
      </Button>
    </div>
  );
};

//单条规则组件

type RuleItemProps = {
  rule: ConditionRule;
  index: number;
  triggerOptions: { fe_id: string; type: string; title: string; props: any }[];
  onChange: (updates: Partial<ConditionRule>) => void;
  onDelete: () => void;
};

const RuleItem: FC<RuleItemProps> = ({ rule, index, triggerOptions, onChange, onDelete }) => {
  // 当前选中的触发组件
  const triggerComponent = triggerOptions.find(item => item.fe_id === rule.sourceId);

  // 当前触发组件支持的字段列表
  const fieldOptions = triggerComponent
    ? componentConditionFields[triggerComponent.type] || []
    : [];

  // 当前选中字段的类型
  const selectedField = fieldOptions.find(f => f.field === rule.sourceField);
  const fieldType = selectedField?.type || 'string';

  // 当前字段支持的运算符
  const operatorOptions = getOperatorsByType(fieldType);

  const needsTargetValue = operatorNeedsTargetValue(rule.operator);

  return (
    <Card
      size="small"
      title={`条件 ${index + 1}`}
      extra={
        <Button type="text" danger icon={<DeleteOutlined />} size="small" onClick={onDelete}>
          删除
        </Button>
      }
    >
      <Space orientation="vertical" style={{ width: '100%' }} size="small">
        {/* 1. 选择触发组件 */}
        <div>
          <Text type="secondary">触发组件</Text>
          <Select
            style={{ width: '100%' }}
            placeholder="请选择触发组件"
            value={rule.sourceId || undefined}
            onChange={sourceId => {
              // 切换组件时，重置字段和运算符
              onChange({ sourceId, sourceField: '', operator: 'eq', targetValue: '' });
            }}
            options={triggerOptions.map(item => ({
              label: `${item.title} (${item.type})`,
              value: item.fe_id,
            }))}
            allowClear
          />
        </div>

        {/* 2. 选择触发字段 */}
        <div>
          <Text type="secondary">触发字段</Text>
          <Select
            style={{ width: '100%' }}
            placeholder="请选择触发字段"
            value={rule.sourceField || undefined}
            onChange={sourceField => {
              // 切换字段时，重置运算符和目标值
              onChange({ sourceField, operator: 'eq', targetValue: '' });
            }}
            options={fieldOptions.map(f => ({
              label: f.label,
              value: f.field,
            }))}
            disabled={!rule.sourceId}
            allowClear
          />
        </div>

        {/* 3. 选择运算符 */}
        <div>
          <Text type="secondary">运算符</Text>
          <Select
            style={{ width: '100%' }}
            placeholder="请选择运算符"
            value={rule.operator}
            onChange={(operator: ConditionOperator) => {
              const updates: Partial<ConditionRule> = { operator };
              if (!operatorNeedsTargetValue(operator)) {
                updates.targetValue = undefined as unknown as string;
              }
              onChange(updates);
            }}
            options={operatorOptions.map(op => ({
              label: op.label,
              value: op.value,
            }))}
            disabled={!rule.sourceField}
          />
        </div>

        {/* 4. 输入目标值 */}
        {needsTargetValue && (
          <div>
            <Text type="secondary">目标值</Text>
            <TargetValueInput
              fieldType={fieldType}
              triggerComponent={triggerComponent}
              value={rule.targetValue}
              onChange={value => onChange({ targetValue: value })}
              disabled={!rule.operator}
            />
          </div>
        )}
      </Space>
    </Card>
  );
};

//目标值输入组件（根据字段类型动态渲染）

type TargetValueInputProps = {
  fieldType: string;
  triggerComponent?: { type: string; props: any };
  value: string | number | boolean | string[];
  onChange: (value: string | number | boolean | string[]) => void;
  disabled?: boolean;
};

const TargetValueInput: FC<TargetValueInputProps> = ({
  fieldType,
  triggerComponent,
  value,
  onChange,
  disabled,
}) => {
  // 单选题特殊处理：选项从组件 props 来
  if (triggerComponent?.props?.options) {
    return (
      <Select
        style={{ width: '100%' }}
        placeholder="请选择目标值"
        value={value as string}
        onChange={val => onChange(val)}
        options={triggerComponent.props.options.map((opt: any) => ({
          label: opt.text,
          value: opt.value,
        }))}
        disabled={disabled}
        allowClear
      />
    );
  }

  // 多选题
  if (triggerComponent?.type === 'questionCheckbox') {
    return (
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="请选择目标值"
        value={Array.isArray(value) ? value : []}
        onChange={val => onChange(val)}
        options={triggerComponent?.props?.list?.map((opt: any) => ({
          label: opt.text,
          value: opt.value,
        }))}
        disabled={disabled}
        allowClear
      />
    );
  }

  // 布尔值
  if (fieldType === 'boolean') {
    return (
      <Select
        style={{ width: '100%' }}
        value={value as boolean}
        onChange={val => onChange(val)}
        options={[
          { label: '是', value: true },
          { label: '否', value: false },
        ]}
        disabled={disabled}
      />
    );
  }

  // 数字
  if (fieldType === 'number') {
    return (
      <Input
        type="number"
        placeholder="请输入目标值"
        value={value as number}
        onChange={e => onChange(Number(e.target.value))}
        disabled={disabled}
      />
    );
  }

  // 默认字符串
  return (
    <Input
      placeholder="请输入目标值"
      value={value as string}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
    />
  );
};

export default ShowCondition;
