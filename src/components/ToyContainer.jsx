// ToyContainer - Renders list of ToyCards

import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys = [], deleteToy, likeToy }) {
  return (
    <div id="toy-collection">
      {toys.map(toy => (
        <ToyCard
          key={toy.id}
          toy={toy}
          deleteToy={deleteToy}
          likeToy={likeToy}
        />
      ))}
    </div>
  );
}

export default ToyContainer;