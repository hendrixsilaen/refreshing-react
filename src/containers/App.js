import React, { Component } from 'react';

import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  state = {
    persons: [
      { id: 'p001', name: 'Hendrix', age: 28 },
      { id: 'p002', name: 'Ester', age: 22 },
      { id: 'p003', name: 'Gwen', age: -4 }
    ],
    otherState: 'some other state',
    showPersons: false
  };

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex],
      name: event.target.value
    };

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons});
  };

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    });
  };

  render() {
    let persons = null;
    if(this.state.showPersons) {
      persons = <Persons
              persons={this.state.persons}
              changed={this.nameChangedHandler}
              clicked={this.deletePersonHandler} />
    };

    const assignedClasses = [];
    if (this.state.persons.length <= 2) {
      assignedClasses.push(classes.red);
    }
    if(this.state.persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <Cockpit
          persons={this.state.persons}
          showPersons={this.state.showPersons}
          toggleClicked={this.togglePersonsHandler} />
        { persons }
      </div>
    );
    //return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
