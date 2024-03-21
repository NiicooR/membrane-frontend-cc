import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTimeout } from "./useTimeout";
import { TriviaType } from "../types";
import { fetchTrivia } from "../services/trivia.service";

export const useTrivia = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["trivia"],
    queryFn: async (): Promise<TriviaType> => {
      return fetchTrivia();
    },
  });

  const { timeoutEnded, setTimer } = useTimeout();
  const [isFinished, setIsFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    null | number
  >(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  useEffect(() => {
    if (data) {
      setAnswers(new Array(data.questions.length).fill(null));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (timeoutEnded) {
      next();
    }
  }, [timeoutEnded]);

  const triviaInfo = data ? { title: data.title, image: data.image } : null;
  const question =
    data && currentQuestionIndex !== null
      ? data.questions[currentQuestionIndex]
      : null;

  const start = () => {
    if (!data) return;
    if (currentQuestionIndex !== null) {
      throw new Error("Trivia already started");
    }
    setCurrentQuestionIndex(0);
    setTimer(data.questions[0].lifetimeSeconds);
  };

  const next = () => {
    if (data === undefined || currentQuestionIndex === null) return;

    if (currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(data.questions[currentQuestionIndex + 1].lifetimeSeconds);
    } else {
      setIsFinished(true);
      setCurrentQuestionIndex(null);
    }
  };

  const summary = isFinished ? { questions: data!.questions, answers } : null;

  const saveAnswer = (answer: number) => {
    if (data === undefined || currentQuestionIndex === null) return;
    if (answer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = answer;
      setAnswers(newAnswers);
    }
  };

  return {
    isLoaded: !isLoading && isSuccess,
    triviaInfo,
    isFinished,
    question,
    answers,
    start,
    next,
    summary,
    saveAnswer,
  };
};
