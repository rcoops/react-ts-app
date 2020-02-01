import React, {Component} from 'react';
import './App.css';
import ShoppingList from './ShoppingList';
import axios from 'axios';

export default class App extends Component<any, any> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className="App">
                <header className="App-header">
                    <ShoppingList name={"Rick"} gitCommits={this.getGithubCommits()} />
                </header>
            </div>
        );
    }

    async getGithubCommits() {
        const commits = await axios.get('https://api.github.com/repos/rcoops/react-ts-app/commits');
        console.log(commits);
        return commits.data.map(d => {
            {}
        });
    }
}
