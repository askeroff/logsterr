function sampleReducer(state = [], action) {
  switch (action.type) {
    case 'SAMPLE_REDUCER':
      console.log('Sample Reducer');
      return state;
    default:
      console.log('Sample Reducer');
      return state;
  }
}

export default sampleReducer;
