import { Link } from 'react-router-dom';
import styles from './Card.module.css';

interface CardProps {
  to: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  color: 'emerald' | 'blue' | 'purple' | 'amber' | 'slate';
  colSpan?: 1 | 2;
  center?: boolean;
}

export function Card({ to, icon, title, subtitle, description, color, colSpan = 1, center = false }: CardProps) {
  const cardClass = `${styles.card} ${styles[`hover-${color}`]} ${colSpan === 2 ? styles.colSpan2 : ''} ${center ? styles.center : ''}`;
  const glowClass = `${styles.glow} ${styles[`glow-${color}`]}`;
  const iconWrapClass = `${styles.iconWrap} ${styles[`icon-${color}`]}`;

  return (
    <Link to={to} className={cardClass}>
      <div className={glowClass}></div>
      {center && <div className={styles.shimmer}></div>}
      {center ? (
        <>
          <i className={`${icon} ${styles.iconCenter}`}></i>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </>
      ) : (
        <>
          <div className={styles.header}>
            <i className={`${icon} ${iconWrapClass}`}></i>
            <div>
              <h2 className={styles.title}>{title}</h2>
              <p className={`${styles.subtitle} ${styles[`text-${color}`]}`}>{subtitle}</p>
            </div>
          </div>
          <p className={styles.description}>{description}</p>
        </>
      )}
    </Link>
  );
}
