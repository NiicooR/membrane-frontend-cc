import Card from "@mui/material/Card";
import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { submit } from "../../services/quiz.service";
import { QuestionType } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { useMetaMask } from "../../hooks/useMetamask";

export const TriviaSummary = ({
  summary: { questions, answers },
}: {
  summary: {
    questions: QuestionType[];
    answers: (number | null)[];
  };
}) => {
  const { wallet } = useMetaMask();
  const { refetch } = useQuery({
    queryKey: ["balance", wallet.accounts[0]],
  });

  const { mutate } = useMutation({
    mutationFn: submit,
    onSettled: () => {
      refetch();
    },
  });

  const formattedAnswers = questions.map((question, i) => {
    let answer = "Unanswered";
    if (answers[i] !== null) {
      answer = question.options[answers[i]!].text;
    }
    return (
      <Box key={question.text} marginTop={1}>
        <Typography>{question.text} </Typography>
        <Typography sx={{ fontWeight: "bold" }}>{answer}</Typography>
      </Box>
    );
  });

  const handleSubmit = () => {
    const generatedId = Math.floor(Math.random() * 100000);
    const parsedAnswers = answers.map((a) => (a ? a : 0));
    mutate({
      surveyId: generatedId,
      answerIds: parsedAnswers,
    });
  };
  return (
    <Card>
      <CardMedia
        sx={{ height: 140 }}
        image="https://t4.ftcdn.net/jpg/00/58/99/07/360_F_58990717_6GkOtlWF1CirNp4cM7v5desXc8Ci8o64.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Trivia is over
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Press submit to validate answers
        </Typography>
        {formattedAnswers}
      </CardContent>
      <CardActions>
        <Button onClick={handleSubmit} size="small">
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};
