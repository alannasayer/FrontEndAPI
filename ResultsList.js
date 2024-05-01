import React from "react";

function ResultsList({ results }) {
  return (
    <div>
      {results.length > 0 ? (
        results.map((entry, index) => (
          <div key={index} className="race-entry">
            <h2>
              {entry.horse} at {entry.course}
            </h2>
            <p>{entry.description}</p>
            <p>
              Position: {entry.position} of {entry.runners?.length || "unknown"}
            </p>
            <p>Class: {entry.class}</p>
            <p>Type: {entry.type}</p>
            <p>Distance: {entry.dist}</p>
            <p>Going: {entry.going}</p>
            <p>Time: {entry.off}</p>
            <p>Jockey: {entry.jockey}</p>
            <p>Trainer: {entry.trainer}</p>
            <p>Owner: {entry.owner}</p>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default ResultsList;
