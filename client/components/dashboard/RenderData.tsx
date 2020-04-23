
import React, { Component } from 'react';
import Tasks from './Tasks';
import { formatTime } from '../../helpers';
import Spinner from '../layout/Spinner';

interface Props {
  data: Array<any>,
  isFetching: boolean
}

class RenderData extends Component<Props, {}> {
  showData(myData: any) {
    const result = [];
    const recursive = (data: any, padding = 0) => {
      data.forEach(project => {
        const myPadding = project.parent_id === '' ? 0 : padding;
        const parentClass = project.parent_id === '' ? 'dashboard__parent' : '';
        if (project.seconds) {
          const element = (
            <div
              style={{ paddingLeft: `${myPadding}px` }}
              className={`dashboard__item ${parentClass}`.trim()}
              key={project._id}
            >
              <h3 className="dashboard__item-title">
                {project.name}: <span>{formatTime(project.seconds)}</span>
              </h3>
              <div className="dashboard__item-tasks">
                <Tasks tasks={project.tasks || []} />
              </div>
            </div>
          );
          result.push(element);
        }
        if (project.children && project.children.length > 0) {
          recursive(project.children, padding + 10);
        }
      });
    };
    recursive(myData);
    if (result.length === 0) {
      return <p>Nothing yet</p>;
    }
    return result;
  }
  render() {
    if (this.props.isFetching) {
      return <Spinner />;
    }
    return this.showData(this.props.data);
  }
}

export default RenderData;
