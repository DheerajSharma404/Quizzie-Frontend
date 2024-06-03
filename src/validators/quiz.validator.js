import { z } from "zod";

const optionSchema = z.object({
  text: z.string().optional(),
  image: z.string().optional(),
  selectedCount: z.number().default(0),
});

const questionSchema = z.object({
  question: z.string().min(1, { message: "Question is Required" }),
  timer: z.number().optional(),
  options: z.array(optionSchema).nonempty({
    message: "Options array must contain between 2 and 4 options.",
  }),
  correctAnswer: z.string().optional(),
  attemptedCount: z.number().default(0),
  correctlyAnsweredCount: z.number().default(0),
  incorrectlyAnsweredCount: z.number().default(0),
});

const quizValidationSchema = z.object({
  quizName: z.string(),
  quizType: z.enum(["Q & A", "Poll Type"]),
  optionType: z.enum(["Text", "Image URL", "Text & Image URL"]),

  questions: z.array(questionSchema).nonempty({
    message: "Questions array must contain between 1 and 5 questions.",
  }),
  impressionCount: z.number().default(0),
});

export default {
  quizValidationSchema,
};
