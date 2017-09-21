function sampleReducer(state = [], action) {
  switch (action.type) {
    case 'PAGE_LOAD':
      return [
        ...state,
        {
          user: action.data.data.user,
        },
      ];
    default:
      console.log('Sample Reducer');
      return state;
  }
}

export default sampleReducer;
