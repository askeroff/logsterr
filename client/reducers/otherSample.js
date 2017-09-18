function otherSample(state = [], action) {
  switch (action.type) {
    case 'OTHER_SAMPLE_REDUCER':
      console.log('other Sample Reducer');
      return state;
    default:
      console.log('other Sample Reducer');
      return state;
  }
}

export default otherSample;
