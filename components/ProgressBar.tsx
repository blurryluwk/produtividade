import { getXPForLevel } from "../utils/xp";

export default function ProgressBar({ currentXP }: { currentXP: number }) {
  let level = 1;
  let xpToNext = getXPForLevel(level);

  while (currentXP >= xpToNext) {
    currentXP -= xpToNext;
    level++;
    xpToNext = getXPForLevel(level);
  }

  const percentage = (currentXP / xpToNext) * 100;

  return (
    <div id="xp-bar" className="xp-bar">
      <p>Nível {level} — {currentXP}/{xpToNext} XP</p>
      <div className="xp-bar-container">
        <div className="xp-bar-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
