import { createSlice } from "@reduxjs/toolkit";

export type StateChatSlice = {
  chatSlice: {
    chatsList: {
      author: string,
      text: string
    }[],
    visibleChats: boolean
  }
}

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chatsList: [{
      author: 'i',
      text: 'my text'
    }, {
      author: 'remote',
      text: `Значимость этих проблем настолько очевидна, что реализация намеченных плановых
       заданий в значительной степени обуславливает создание систем массового участия. 
       Повседневная практика показывает, что постоянное информационно-пропагандистское 
       обеспечение нашей деятельности обеспечивает широкому кругу (специалистов) участие в
        формировании позиций, занимаемых участниками в отношении поставленных задач.

        Равным образом новая модель организационной деятельности представляет собой интересный 
        эксперимент проверки дальнейших направлений развития. Таким образом постоянный количественный 
        рост и сфера нашей активности позволяет выполнять важные задания по разработке форм развития.

       Разнообразный и богатый опыт дальнейшее развитие различных форм деятельности влечет за 
       собой процесс внедрения и модернизации систем массового участия. Идейные соображения 
       высшего порядка, а также постоянное информационно-пропагандистское обеспечение нашей 
       деятельности играет важную роль в формировании модели развития. Повседневная практика 
       показывает, что постоянный количественный рост и сфера нашей активности обеспечивает 
       широкому кругу (специалистов) участие в формировании дальнейших направлений развития.`
    }],
    visibleChats: false
  },

  reducers: {
    addChatStrophe: (state, action) => {
      state.chatsList.push(action.payload)
    },
    changeVisibleChats: ((state) => {
      state.visibleChats = !state.visibleChats
    })
  }
})

export const { addChatStrophe, changeVisibleChats } = chatSlice.actions

export default chatSlice.reducer
