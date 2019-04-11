import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  root: {
    width: "70%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 400
  }
});

// let prev = 0;
// let next = 0;
// let last = 0;
// let first = 0;

class SimpleTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      searchString: "",
      currentPage: 1,
      dataPerPage: 10,
      sort: {
        column: null,
        direction: ""
      }
    };
  }

  onSort = column => e => {
    const direction = this.state.sort.column
      ? this.state.sort.direction === "asc"
        ? "desc"
        : "asc"
      : "desc";
    const sortedData = this.state.data.sort((a, b) => {
      if (column === "first_name") {
        const nameA = a.first_name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.first_name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      } else {
        return a.last_name - b.last_name;
      }
    });

    if (direction === "desc") {
      sortedData.reverse();
    }

    this.setState({
      data: sortedData,
      currentPage: 1,
      dataPerPage: 10,
      sort: {
        column,
        direction
      }
    });
  };
  setArrow = column => {
    let className = "sort-direction";

    if (this.state.sort.column === column) {
      className += this.state.sort.direction === "asc" ? " asc" : " desc";
    }

    console.log(className);

    return className;
  };

  componentDidMount() {
    fetch("http://demo9197058.mockable.io/users")
      .then(response => response.json())

      .then(data => this.setState({ data: data }));

    this.refs.search.focus();
  }

  handleChange = () => {
    this.setState({
      searchString: this.refs.search.value
    });
  };

  handleClick = event => {
    console.log("Button Clicked");
    this.setState({
      currentPage: Number(event.target.id)
    });
  };

  // handleLastClick(event) {
  //   event.preventDefault();
  //   this.setState({
  //     currentPage: last
  //   });
  // }
  // handleFirstClick(event) {
  //   event.preventDefault();
  //   this.setState({
  //     currentPage: 1
  //   });
  // }

  render() {
    let _users = this.state.data;
    let search = this.state.searchString.trim().toLowerCase();
    //pagiination again

    const { dataPerPage, currentPage } = this.state;
    const indexOfLastData = currentPage * dataPerPage;
    const indexOfFirstData = indexOfLastData - dataPerPage;

    const currentData = _users.slice(indexOfFirstData, indexOfLastData);
    const renderData = currentData.map((data, index) => {
      return (
        <TableBody>
          <TableRow key={index}>
            <TableCell>{data.id}</TableCell>
            <TableCell align="right">{data.first_name}</TableCell>
            <TableCell align="right">{data.last_name}</TableCell>
            <TableCell align="right">{data.company_name}</TableCell>
            <TableCell align="right">{data.city}</TableCell>
            <TableCell align="right">{data.state}</TableCell>
            <TableCell align="right">{data.zip}</TableCell>
            <TableCell align="right">{data.email}</TableCell>
            <TableCell align="right">{data.web}</TableCell>
            <TableCell align="right">{data.age}</TableCell>
          </TableRow>
        </TableBody>
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(_users.length / dataPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>
      );
    });

    if (search.length > 0) {
      _users = _users.filter(data =>
        data.first_name.toLowerCase().match(search)
      );
    }
    return (
      <div>
        <input
          type="text"
          value={this.state.searchString}
          ref="search"
          onChange={this.handleChange}
          placeholder="type name here"
        />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right" onClick={this.onSort("first_name")}>
                first_name
                <span className={this.setArrow("first_name")} />
              </TableCell>
              <TableCell align="right" onClick={this.onSort("")}>
                Last Name
                <span className={this.setArrow("first_name")} />
              </TableCell>
              <TableCell align="right" onClick={this.onSort("")}>
                Company Name
                <span className={this.setArrow("first_name")} />
              </TableCell>
              <TableCell align="right" onClick={this.onSort("")}>
                City
                <span className={this.setArrow("first_name")} />
              </TableCell>
              <TableCell align="right" onClick={this.onSort("")}>
                State
                <span className={this.setArrow("first_name")} />
              </TableCell>
              <TableCell align="right" onClick={this.onSort("")}>
                Zip
                <span className={this.setArrow("first_name")} />
              </TableCell>
              <TableCell align="right" onClick={this.onSort("")}>
                Email
                <span className={this.setArrow("first_name")} />
              </TableCell>
              <TableCell align="right" onClick={this.onSort("")}>
                Web
                <span className={this.setArrow("first_name")} />
              </TableCell>
              <TableCell align="right" onClick={this.onSort("")}>
                Age
                <span className={this.setArrow("first_name")} />
              </TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {_users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell align="right">{user.first_name}</TableCell>
                <TableCell align="right">{user.last_name}</TableCell>
                <TableCell align="right">{user.company_name}</TableCell>
                <TableCell align="right">{user.city}</TableCell>
                <TableCell align="right">{user.state}</TableCell>
                <TableCell align="right">{user.zip}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.web}</TableCell>
                <TableCell align="right">{user.age}</TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>

        <div>
          <ul>{renderData}</ul>
          <ul id="page-numbers">{renderPageNumbers}</ul>
        </div>
      </div>
    );
  }
}

// SimpleTable.propTypes = {
//   classes: PropTypes.object.isRequired
// };

export default withStyles(styles)(SimpleTable);
