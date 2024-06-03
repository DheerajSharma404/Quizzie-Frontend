import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import AuthLayout from "./_auth/AuthLayout";
import SignInForm from "./_auth/forms/signIn/SignInForm";
import SignUpForm from "./_auth/forms/signUp/SignUpForm";
import RootLayout from "./_root/RootLayout";

import {
  Dashboard,
  LiveQuiz,
  QuestionAnalysis,
  QuizAnalytics,
} from "./_root/pages";

import { ProtectedRoute } from "./components";

const App = () => {
  return (
    <main className='main'>
      <Toaster richColors={true} expand={true} position='top-right' />
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path='/sign-in' element={<SignInForm />} />
          <Route path='/sign-up' element={<SignUpForm />} />
        </Route>
        <Route path='/live-quiz/:quizId' element={<LiveQuiz />} />
        {/* Private Routes */}
        <Route
          element={
            <ProtectedRoute>
              <RootLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='/quiz-analytics' element={<QuizAnalytics />} />
          <Route
            path='/question-analysis/:quizId'
            element={<QuestionAnalysis />}
          />
        </Route>
      </Routes>
    </main>
  );
};
export default App;
