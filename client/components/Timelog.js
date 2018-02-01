import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import Layout from './layout/Layout';
import Spinner from './layout/Spinner';
import Pagination from './layout/Pagination';
import TimelogItem from './TimelogItem';
import NotLoggedIn from './NotLoggedIn';
import { getLogs, clearLogs, deleteLog } from '../actions/timelog';
import { formatDate } from '../helpers';

class Timelog extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogDelete = this.handleLogDelete.bind(this);
  }

  componentDidMount() {
    this.props.clearLogsList();
    this.props.handleGetLogs(this.props.match.params.page);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.page !== nextProps.match.params.page) {
      this.props.handleGetLogs(nextProps.match.params.page);
    }
  }

  handleLogDelete(id) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, the data will be gone',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        this.props.handleDelete(id);
      }
    });
  }

  render() {
    let logs = null;
    let pagination = null;

    if (this.props.timelogs && this.props.timelogs.authenticated === false) {
      return <NotLoggedIn />;
    }

    if (this.props.timelogs && this.props.timelogs.data) {
      let showDate = false;
      let date;
      logs = this.props.timelogs.data.map(item => {
        const project = item.projectdata[0]
          ? item.projectdata[0].name
          : 'Not found';

        if (formatDate(item.started) !== formatDate(date)) {
          date = item.started;
          showDate = true;
        } else {
          showDate = false;
        }
        return (
          <TimelogItem
            key={item._id}
            id={item._id}
            name={item.name}
            seconds={item.seconds}
            started={item.started}
            project={project}
            showDate={showDate}
            handleDelete={this.handleLogDelete}
          />
        );
      });
    }
    if (this.props.timelogs && this.props.timelogs.page) {
      const { page, pages, count } = this.props.timelogs;
      pagination = (
        <Pagination page={parseInt(page, 10)} pages={pages} count={count} />
      );
    }

    return (
      <Layout>
        <h1 className="page-title">History of your logged time</h1>
        {!this.props.timelogs.data ? <Spinner /> : null}
        <ul className="timelogs">{logs}</ul>
        {pagination}
      </Layout>
    );
  }
}

Timelog.defaultProps = {
  timelogs: {
    data: [],
  },
};

Timelog.propTypes = {
  handleGetLogs: PropTypes.func.isRequired,
  clearLogsList: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  timelogs: PropTypes.object,
  match: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  timelogs: state.timelog,
});

const mapDispatchToProps = dispatch => ({
  handleGetLogs(page) {
    dispatch(getLogs(page));
  },
  clearLogsList() {
    dispatch(clearLogs());
  },
  handleDelete(id) {
    dispatch(deleteLog(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Timelog);
