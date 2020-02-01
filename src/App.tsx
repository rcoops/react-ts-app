import React, {Component} from 'react';
import './App.css';
import CommitsList from './CommitsList';

export default class App extends Component<any, any> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="App">
                <header className="App-header">
                    <CommitsList name={"Rick"} />
                </header>
            </div>
        );
    }
}
