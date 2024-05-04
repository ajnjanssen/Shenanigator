import React from "react";

interface LevelProps {
  userHasLevel: string; // Expects a string representing the numeric level
}

const Level: React.FC<LevelProps> = ({ userHasLevel }) => {
  // Map of level numbers to descriptions
  const levels: { [key: number]: string } = {
    1: "n00b",
    2: "Apprentice",
    3: "Journeyman",
    4: "Master",
    5: "Grandmaster",
  };

  // Convert the passed string to a number and ensure it is a valid number before using it
  const levelNum = parseInt(userHasLevel, 10);
  const levelDescription = levels[levelNum];
  console.log(levelNum);
  return (
    <div className="text-sm opacity-50">
      {levelDescription || "Unknown Level"}
    </div>
  );
};

export default Level;
