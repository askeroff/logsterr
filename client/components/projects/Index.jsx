"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var react_redux_1 = require("react-redux");
var projects_1 = require("../../actions/projects");
var Layout_1 = require("../layout/Layout");
var Spinner_1 = require("../layout/Spinner");
var ProjectsList_1 = require("./ProjectsList");
var AddForm_1 = require("./AddForm");
var Index = /** @class */ (function (_super) {
    __extends(Index, _super);
    function Index() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            parentID: '',
            showForm: false,
            formInput: '',
            showArchived: false
        };
        _this.getAddFormProps = function () { return ({
            inputValue: _this.state.formInput,
            handleInput: _this.handleFormInput,
            className: 'form form__newproject',
            clickHandler: function (e) {
                e.preventDefault();
                _this.addProject(_this.state.formInput, _this.state.parentID);
            },
            changeSelect: function (e) {
                _this.selectParent(e);
            },
            parentID: _this.state.parentID,
            projects: _this.props.projects.list,
            labelName: 'Name Of Your New Project'
        }); };
        _this.selectParent = function (event) {
            _this.setState({
                parentID: event.currentTarget.value
            });
        };
        _this.showAddForm = function () {
            _this.setState({
                showForm: !_this.state.showForm
            });
        };
        _this.addProject = function (name, id) {
            _this.props.handleAdding(name, id);
            _this.setState({
                showForm: false,
                formInput: ''
            });
        };
        _this.toggleArchived = function () {
            _this.setState({
                showArchived: !_this.state.showArchived
            });
        };
        _this.handleFormInput = function (event) {
            _this.setState({ formInput: event.currentTarget.value });
        };
        return _this;
    }
    Index.prototype.componentDidMount = function () {
        if (this.props.projects.isFetching === undefined) {
            this.props.clearProjectsList();
            this.props.handleProjects();
        }
    };
    Index.prototype.render = function () {
        var addLinkText = this.state.showForm ? 'Hide The Form' : 'Add New One';
        var archivedText = this.state.showArchived
            ? 'Hide Archived Projects'
            : 'Show Archived Projects';
        var projects = (<ul className="projects__list">
        <ProjectsList_1.default showArchived={this.state.showArchived} projects={this.props.projects.list}/>
      </ul>);
        return (<Layout_1.default>
        <div className="projects">
          <h1 className="page-title">Projects</h1>
          <div className="projects--topbuttons">
            <button onClick={this.showAddForm} className="button--submit">
              {addLinkText}
            </button>
            <button onClick={this.toggleArchived} className="button--submit">
              {archivedText}
            </button>
          </div>
          {this.state.showForm ? <AddForm_1.default {...this.getAddFormProps()}/> : null}
          {this.props.projects.isFetching ? <Spinner_1.default /> : null}
          {projects}
        </div>
      </Layout_1.default>);
    };
    Index.defaultProps = {
        user: {},
        projects: []
    };
    return Index;
}(React.Component));
Index.defaultProps = {
    user: {},
    projects: {}
};
var mapStateToProps = function (state) { return ({
    projects: state.projects,
    user: state.user
}); };
var mapDispatchToProps = function (dispatch) { return ({
    handleProjects: function () {
        dispatch(projects_1.fetchProjects());
        dispatch(projects_1.getProjects());
    },
    handleAdding: function (name, id) {
        dispatch(projects_1.addProject(name, id));
    },
    clearProjectsList: function () {
        dispatch(projects_1.clearProjects());
    }
}); };
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Index);
