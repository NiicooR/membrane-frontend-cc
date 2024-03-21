import { Box } from "@mui/material";
import { Question } from "./Question";
import { TriviaCover } from "./TriviaCover";
import { TriviaSummary } from "./TriviaSummary";
import { TriviaSkeleton } from "./TriviaSkeleton";
import { useTrivia } from "../../hooks/useTrivia";

export const Trivia = () => {
  const {
    triviaInfo,
    start,
    isFinished,
    question,
    next,
    isLoaded,
    summary,
    saveAnswer,
  } = useTrivia();

  const coverCard = !isFinished && triviaInfo !== null && question === null && (
    <TriviaCover
      title={triviaInfo.title}
      image={triviaInfo.image}
      onStart={start}
    />
  );

  const questionCard = question && (
    <Question
      key={question.text}
      question={question}
      nextQuestion={next}
      saveAnswer={saveAnswer}
    />
  );

  const summaryCard = isFinished && summary && (
    <TriviaSummary summary={summary} />
  );

  return (
    <Box paddingTop={1}>
      {!isLoaded && <TriviaSkeleton />}
      {coverCard}
      {questionCard}
      {summaryCard}
    </Box>
  );
};
