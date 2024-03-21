export const fetchTrivia = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  return (await import("../mocks/survey-sample.json")).default;
};
