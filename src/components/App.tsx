import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router';
import Main from './Main';
import Crafting from './modules/Crafting/Crafting';
import Requirements from './modules/Crafting/Requirements/Requirements';
import Shattering from './modules/Shattering/Shattering';
import Automation from './modules/Automation/Automation';
import Unicorns from './modules/Unicorns/Unicorns';
import Notifications from './modules/Notifications/Notifications';
import ResourceTriggers from './modules/Notifications/ResourceTriggers/ResourceTriggers';
import Synchronization from './modules/Synchronization/Synchronization';

const App: React.StatelessComponent<{}> = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route exact path="/crafting" component={Crafting} />
    <Route exact path="/crafting/:item" component={Requirements} />
    <Route exact path="/shattering" component={Shattering} />
    <Route exact path="/automation" component={Automation} />
    <Route exact path="/unicorns" component={Unicorns} />
    <Route exact path="/notifications" component={Notifications} />
    <Route exact path="/notifications/resources" component={ResourceTriggers} />
    <Route exact path="/synchronization" component={Synchronization} />
  </Switch>
);

export default hot(module)(App);
