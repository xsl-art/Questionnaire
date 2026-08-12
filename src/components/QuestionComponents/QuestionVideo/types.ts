export type QuestionVideoProps = {
  fe_id?: string;
  src?: string;
  width?: number | string;
  height?: number | string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  onChange?: (newProps: QuestionVideoProps) => void;
  disabled?: boolean;
};

export const defaultQuestionVideoProps: QuestionVideoProps = {
  src: '',
  width: '100%',
  height: 'auto',
  autoPlay: false,
  controls: true,
  loop: false,
  muted: false,
  poster: '',
};
