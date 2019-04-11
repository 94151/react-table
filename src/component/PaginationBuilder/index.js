import React, { Component } from "react";
import "./style.css";

class PaginationBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o"
      ],
      currentPage: 1,
      todosPerPage: 4
    };
  }
  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  };
  render() {
    const { todos, todosPerPage, currentPage } = this.state;

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;

    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
    const renderTodos = currentTodos.map((todo, index) => {
      return <li key={index}>{todo}</li>;
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>
      );
    });

    return (
      <div>
        <ul>{renderTodos}</ul>
        <ul id="page-numbers">{renderPageNumbers}</ul>
      </div>
    );
  }
}

export default PaginationBuilder;
