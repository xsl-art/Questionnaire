## 一、模块一：组件联动与条件显示

### 核心步骤

1. **定义类型**（`src/components/QuestionComponents/type.ts`）
   - 新增 `ConditionRule`、`ConditionGroup` 类型
   - `ComponentInfoType` 增加 `visibleCondition` 字段

2. **条件配置面板**（`src/components/ConditionConfig/index.tsx`）
   - 选择触发组件、字段、运算符、目标值
   - 支持 AND/OR 逻辑组合

3. **条件计算引擎**（`src/utils/conditionEngine.ts`）
   - `evaluateCondition()`：单条规则计算
   - `evaluateConditionGroup()`：条件组计算

4. **运行时显隐**（`src/pages/question/Edit/EditCanvas/index.tsx`）
   - 创建 `useComponentVisibility` Hook
   - 渲染时过滤 `isVisible === false` 的组件

5. **属性面板集成**（`src/pages/question/Edit/RightPanel/index.tsx`）
   - 新增"显示条件"折叠面板

---
