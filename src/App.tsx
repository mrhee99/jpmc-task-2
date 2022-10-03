import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**
 * State declaration for <App />
 */
interface IState {
  data: ServerRespond[],
  // changing the static table into a live graph.
  showGraph: boolean,
}

/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      // data saves the server responds.
      // We use this state to parse data down to the child element (Graph) as element property
      data: [],
      // to make the graph only show up once the user clicks on 'Start Streaming Data'.
      showGraph: false,
    };
  }

  /**
   * Render Graph react component with state.data parse as property data
   */
  renderGraph() {
    // if the user clicks on 'Start Streaming Data', render the graph.
    if (this.state.showGraph){
      return (<Graph data={this.state.data}/>)
    }
  }

  /**
   * Get new data from server and update the state with the new data
   */
  getDataFromServer() {
    // start with 0 data point.
    let x = 0;
    // setting up interval.
    const interval = setInterval (() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        // when the server responds and 'Start Streaming Data' button is clicked,
        this.setState({
          data: serverResponds,
          showGraph: true,
        });
     });
    // iterate the action.
     x++;
     // if it reaches to 1000 data points, cancels the interval action.  
     if (x>1000) {
      clearInterval(interval);
     }
    // displaying the data every 100 milliseconds
    }, 100);
  }
  
  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
