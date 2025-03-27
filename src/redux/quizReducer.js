import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizId: null,
  answers: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizId: (state, action) => {
      state.quizId = action.payload;
    },
    addAnswer: (state, action) => {
      const { questionId, answer } = action.payload;

      if (!Array.isArray(state.answers)) {
        state.answers = [];
      }

      const existingAnswer = state.answers.find(
        (ans) => ans.questionId === questionId
      );

      if (existingAnswer) {
        existingAnswer.answer = answer;
      } else {
        state.answers.push({ questionId, answer });
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
