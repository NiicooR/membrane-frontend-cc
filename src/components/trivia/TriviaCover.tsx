import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export const TriviaCover = ({
  image,
  title,
  onStart,
}: {
  image: string;
  title: string;
  onStart: () => void;
}) => {
  return (
    <Card>
      <CardMedia sx={{ height: 140 }} image={image} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Press start when you are ready to start the trivia
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onStart} size="small">
          Start
        </Button>
      </CardActions>
    </Card>
  );
};
