const checkHasData = projects => {
  let hasData = false;
  projects.forEach(project => {
    if (project.seconds) {
      hasData = true;
    }
  });
  return hasData;
};

export const getDrilldown = data => {
  const result = [];

  const recursive = (children, name) => {
    const childrenResult = [];
    let parentId;
    children.forEach(child => {
      const hasData = checkHasData(child.children) && child._id;
      if (child.seconds) {
        parentId = child.parent_id;
        childrenResult.push({
          name: child.name,
          y: child.seconds / 3600,
          drilldown: hasData || null
        });
      }
      if (hasData) {
        recursive(child.children, child.name);
      }
    });
    if (childrenResult.length) {
      result.push({
        name,
        id: parentId,
        drilldown: null,
        data: childrenResult
      });
    }
  };

  data.forEach(project => {
    if (project.seconds && checkHasData(project.children)) {
      recursive(project.children, project.name);
    }
  });
  return result;
};

export const prepareData = (data, drilldown) => {
  const seriesData = data
    .map(item => {
      if (item.seconds && checkHasData(item.children)) {
        return {
          name: item.name,
          y: item.seconds / 3600,
          drilldown: item._id
        };
      } else if (item.seconds) {
        return {
          name: item.name,
          y: item.seconds / 3600,
          drilldown: null
        };
      }
      return null;
    })
    .filter(item => item !== null);
  return {
    xAxis: {
      type: 'category'
    },
    series: [
      {
        name: 'Projects',
        colorByPoint: true,
        data: seriesData
      }
    ],
    drilldown: {
      series: drilldown
    }
  };
};
