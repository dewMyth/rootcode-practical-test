import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizData: [],
  // { quizId, questionId, answer }
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    addAnswer: (state, action) => {
      const { quizId, questionId, answer } = action.payload;

      if (!Array.isArray(state.quizData)) {
        state.answers = [];
      }

      const existingAnswer = state.quizData.find(
        (qd) => qd.questionId === questionId && qd.quizId === quizId
      );

      if (existingAnswer) {
        existingAnswer.answer = answer;
      } else {
        console.log(state.quizData);
        state.quizData.push({ quizId, questionId, answer });
      }
    },
    removeAnswer: (state, action) => {
      const { questionId } = action.payload;

      if (Array.isArray(state.answers)) {
        state.answers = state.answers.filter(
          (ans) => ans.questionId !== questionId
        );
      }
    },
  },
});

export const { setQuizId, addAnswer, removeAnswer } = quizSlice.actions;
export default quizSlice.reducer;
