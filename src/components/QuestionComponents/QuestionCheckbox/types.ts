export type OptionType = {
  value: string;
  text: string;
  checked: boolean;
};

export type QuestionCheckboxProps = {
  title?: string;
  isVertical?: boolean;
  list?: OptionType[];
  onChange?: (newProps: QuestionCheckboxProps) => void;
  disabled?: boolean;
};

export const defaultQuestionCheckboxProps: QuestionCheckboxProps = {
  title: '多选标题',
  isVertical: false,
  list: [
    {
      value: 'item1',
      text: '选项1',
      checked: false,
    },
    {
      value: 'item2',
      text: '选项2',
      checked: false,
    },
    {
      value: 'item3',
      text: '选项3',
      checked: false,
    },
  ],
};

//统计属性
export type QuestionCheckboxStatisticsProps = {
  stat: Array<{ name: string; count: number }>;
};
