import React, { Component } from "react";
import "./App.css";
// import TableView from "./component/Tableview";
import Navbar from "./component/Navbar";
import SimpleTable from "./component/Tableviews";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        {/* <TableView /> */}
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
