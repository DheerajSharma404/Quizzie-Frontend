/* eslint-disable react/prop-types */

import styles from "./StatsCard.module.css";

const StatsCard = ({ stat, label, color }) => {
  return (
    <div className={styles.statCard}>
      <p>
        <span className={`${styles.stat} ${color && styles[color]}`}>
          {stat}
        </span>
        <span className={`${styles.label} ${color && styles[color]}`}>
          {label}
        </span>
      </p>
    </div>
  );
};

export default StatsCard;
