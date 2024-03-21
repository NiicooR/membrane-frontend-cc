export type TriviaType = {
  title: string;
  image: string;
  questions: QuestionType[];
};

export type QuestionType = {
  text: string;
  image: string;
  lifetimeSeconds: number;
  options: OptionType[];
};

export type OptionType = {
  text: string;
};
