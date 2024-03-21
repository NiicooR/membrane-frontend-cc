import Button from "@mui/material/Button";
import { useForm, Controller } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import { useEffect } from "react";
import { QuestionType } from "../../types";
import ProgressBar from "../ProgressBar";

type FormValues = {
  answer: string;
};

export const Question = ({
  question,
  nextQuestion,
  saveAnswer,
}: {
  question: QuestionType;
  nextQuestion: () => void;
  saveAnswer: (answer: number) => void;
}) => {
  const { control, watch } = useForm<FormValues>({
    defaultValues: {
      answer: "",
    },
  });

  const answerWatch = watch("answer");

  useEffect(() => {
    if (!answerWatch) return;
    const answerIndex = question.options.findIndex(
      (option) => option.text === answerWatch
    );
    saveAnswer(answerIndex);
  }, [answerWatch]);
  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image={question.image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {question.text}
        </Typography>
        <ProgressBar ttl={question.lifetimeSeconds} />
        <form noValidate>
          <FormControl>
            <Controller
              render={({ field }) => {
                return (
                  <RadioGroup {...field}>
                    {question.options.map((option) => (
                      <FormControlLabel
                        key={option.text}
                        value={option.text}
                        control={<Radio id={Date.now().toString()} />}
                        label={option.text}
                      />
                    ))}
                  </RadioGroup>
                );
              }}
              name="answer"
              control={control}
            />
          </FormControl>
        </form>

        <CardActions>
          <Button
            onClick={() => {
              nextQuestion();
            }}
            size="small"
          >
            Next
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};
