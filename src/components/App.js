import React, { Component } from 'react';
import Setup from './screens/Setup';
import Wordpress from './screens/Wordpress';
import Plugin from './screens/Plugin';
import Login from './screens/Login';
import GitHub from './screens/GitHub';
import End from './screens/End';
import { AppWrap } from './UI';
import { connect } from 'react-redux';
import Header from './Header';
import Update from './Update';


class App extends Component {


  renderSections() {

    const { section } = this.props.nav;

    switch (section) {

      case 'login':
        return <Login />;
        break;

      case 'setup':
        return <Setup />;
        break;

      case 'wordpress':
        return <Wordpress />;
        break;

      case 'plugins':
        return <Plugin />;
        break;

      case 'github':
        return <GitHub />;
        break;

      case 'end':
        return <End />;
        break;


      default: break;

    }

  }


  render() {
    const { section } = this.props.nav;

    return (
      <AppWrap>
        {section !== 'loading' && <Header />}
        <Update/>
        {this.renderSections()}
      </AppWrap>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})

export default connect(mapStateToProps)(App);