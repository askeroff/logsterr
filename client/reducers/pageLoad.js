function pageLoad(state = [], action) {
  switch (action.type) {
    case 'PAGE_LOAD':
      console.log('PAGE_LOAD WHAAAT?', action.payload);
      return action.payload;
    default:
      console.log('Sample Reducer');
      return state;
  }
}

export default pageLoad;
