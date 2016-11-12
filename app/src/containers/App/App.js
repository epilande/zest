import React, { Component } from 'react';
import styles from './App.css';

export default class App extends Component {
  static propTypes = {
  };

  render() {
    return (
      <div className={styles.base}>
        <div className={styles.trayTriangle} />
        <main className={styles.main}>
          Select Project:
          <select>
            <option>123</option>
            <option>abc</option>
          </select>
        </main>
      </div>
    );
  }
}
