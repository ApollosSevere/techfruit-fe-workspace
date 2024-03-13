// components/Achievement.tsx

import React from "react";

interface AchievementProps {
  title: string;
  description: string;
}

const Achievement: React.FC<AchievementProps> = ({ title, description }) => {
  return (
    <div className="my-8">
      <h2 className="font-bold text-xl">{title}</h2>
      <p className="mt-2">{description}</p>
    </div>
  );
};

export default Achievement;
