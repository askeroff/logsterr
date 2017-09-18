// increment
export function sample(index) {
  return {
    type: 'SAMPLE_REDUCER',
    index,
  };
}

// add comment
export function othersample(index) {
  return {
    type: 'OTHER_SAMPLE_REDUCER',
    index,
  };
}
