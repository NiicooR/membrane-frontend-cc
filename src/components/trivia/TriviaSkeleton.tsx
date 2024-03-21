import Skeleton from "@mui/material/Skeleton";

export const TriviaSkeleton = () => {
  return (
    <>
      <Skeleton variant="rounded" height={140} />
      <Skeleton variant="text" sx={{ fontSize: "1.5rem", marginTop: 2 }} />
      <Skeleton variant="text" sx={{ fontSize: "1rem", marginTop: 1 }} />
      <Skeleton
        variant="text"
        sx={{ fontSize: "3rem", width: 40, marginTop: 2 }}
      />
    </>
  );
};
