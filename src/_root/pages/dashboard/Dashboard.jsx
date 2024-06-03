import React from "react";
import { QuizCard, StatsCard } from "../../../components";
import { AuthContext } from "../../../contexts/AuthContext";
import { useQuiz } from "../../../contexts/QuizContext";
import { formatCount } from "../../../utils";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { user, fetchUser } = React.useContext(AuthContext);
  const { quizzes: Quizzes, fetchAllQuizess } = useQuiz();

  const trendingQuizzes = Quizzes?.filter((quiz) => quiz.impressionCount > 10)
    .sort((a, b) => b.impressionCount - a.impressionCount)
    .slice(0, 12);

  React.useEffect(() => {
    fetchAllQuizess();
    fetchUser();
  }, []);
  return (
    <>
      <div className={styles.statCardWrapper}>
        <StatsCard stat={user?.quizCount} label='Quiz Created' color='orange' />
        <StatsCard
          stat={user?.questionCount}
          label='Questions Created'
          color='green'
        />
        <StatsCard
          stat={formatCount(user?.impressionCount)}
          label='Total Impressions'
          color='blue'
        />
      </div>
      <section className={styles.trendingQuizzes}>
        <h2>Trending Quizzes</h2>
        <div className={styles.quizCardWrapper}>
          {trendingQuizzes?.map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
