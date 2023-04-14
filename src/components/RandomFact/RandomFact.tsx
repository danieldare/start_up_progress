import { useRandomFact } from 'hooks/useRandomFact';
import styles from './RandomFact.module.css';

type RandomFactProps = {
  isAllPhasesCompleted: boolean;
};

const RandomFact = ({ isAllPhasesCompleted }: RandomFactProps) => {
  const [isLoading, error, randomFact] = useRandomFact(isAllPhasesCompleted);

  if (isLoading) return <p>Loading random facts...</p>;
  if (error) return <p>{error}</p>;

  return (
    randomFact && (
      <div className={styles.randomFactContainer}>
        Random Fact: <p className={styles.randomText}>{randomFact?.text}</p>
      </div>
    )
  );
};

export default RandomFact;
