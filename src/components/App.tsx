import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router';
import Main from './Main';
import Crafting from './modules/Crafting/Crafting';
import Shattering from './modules/Shattering/Shattering';
import Automation from './modules/Automation/Automation';

const App: React.StatelessComponent<{}> = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route exact path="/crafting" component={Crafting} />
    <Route exact path="/shattering" component={Shattering} />
    <Route exact path="/automation" component={Automation} />
  </Switch>
);

export default hot(module)(App);
