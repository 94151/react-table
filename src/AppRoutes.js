import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SimpleTable from "./component/Tableviews";
import About from "./component/Background";
import ShoppingListFilter from "./component/Shoppinglist";
import Search from "./component/SearchFilter";
import CardDisplay from "./component/CardDisplay";
import PaginationBuilder from "./component/PaginationBuilder";

class AppRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={SimpleTable} />
        <Route exact path="/background" component={About} />
        <Route exact path="/filter" component={ShoppingListFilter} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/displaycard" component={CardDisplay} />
        <Route exact path="/pagination" component={PaginationBuilder} />
      </Switch>
    );
  }
}

export default AppRoutes;
