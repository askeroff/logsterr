function pageLoad(state = [], action) {
  switch (action.type) {
    case 'PAGE_LOAD':
      console.log('PAGE_LOAD WHAAAT?');
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

export default pageLoad;
