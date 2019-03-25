/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Container,Content} from 'native-base';
import NavHeader from '../components/NavHeader.js';
import NavFooter from '../components/NavFooter.js';

// type Props = {};
export default class Search extends Component {
  render() {
    return (
      <Container>
        <Content/>
        <NavFooter/>
      </Container>
    );
  }
}
