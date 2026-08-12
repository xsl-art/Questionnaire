export type OptionsType = {
  text: string;
  value: string;
};

export type QuestionRadioProps = {
  fe_id?: string;
  title?: string;
  isVertical?: boolean;
  options?: OptionsType[];
  value?: string;

  onChange?: (newProps: QuestionRadioProps) => void;
  disabled?: boolean;
};

export const defaultQuestionRadioProps: QuestionRadioProps = {
  title: '单选标题',
  isVertical: false,
  options: [
    {
      text: '选项1',
      value: 'item1',
    },
    {
      text: '选项2',
      value: 'item2',
    },
    {
      text: '选项3',
      value: 'item3',
    },
  ],
  value: '',
};

//统计属性
export type QuestionRadioStatisticsProps = {
  stat: Array<{ name: string; count: number }>;
};
