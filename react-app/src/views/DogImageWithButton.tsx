// DogImageWithButton.tsx
import React, { FC } from "react";
import { useFetch } from "./useFetch";

type DogImageType = { message: string; status: string };

export const DogImageWithButton: FC = () => {
  /** Fetch image on button click */
  const { data, fetchApi } = useFetch<DogImageType>({
    url: "https://dog.ceo/api/breed/beagle/images/random",
  });

  const getImage = () => {
    fetchApi();
  };

  return (
    <>
      {data ? <img src={data.message} alt="dog"></img> : <div>Loading</div>}
      <button onClick={() => getImage()}>New Image</button>
    </>
  );
};
