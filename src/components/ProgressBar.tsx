import { useEffect, useState } from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function LinearProgressWithLabel(
  props: LinearProgressProps & {
    value: number;
    ttl: number;
    elapsedTime: number;
  }
) {
  const { ttl, elapsedTime, ...rest } = props;
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...rest} />
      </Box>
      <Box sx={{ minWidth: 15 }}>
        <Typography variant="body2" color="text.secondary">{`${
          ttl - elapsedTime - 1
        }`}</Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel({ ttl }: { ttl: number }) {
  const PROGRESS_STEP = 100 / ttl;
  const [progress, setProgress] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setProgress(PROGRESS_STEP);
    }, 100); // Workaround to start from 0 and ends with fulfilled bar

    const intervalRef = setInterval(() => {
      setProgress((prevProgress) => prevProgress + PROGRESS_STEP);
      setElapsedTime((prevProgress) => prevProgress + 1);
    }, 1000);
    return () => {
      clearInterval(intervalRef);
    };
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel
        value={progress}
        ttl={ttl}
        elapsedTime={elapsedTime}
      />
    </Box>
  );
}
