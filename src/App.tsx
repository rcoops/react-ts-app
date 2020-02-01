import React, {Component} from 'react';
import './App.css';
import ShoppingList from './ShoppingList';
import axios from 'axios';
import { GitCommit } from './app';

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

    async getGithubCommits(): Promise<GitCommit[]> {
        const commits = await axios.get('https://api.github.com/repos/rcoops/react-ts-app/commits');
        return commits.data.map((d: any) =>
            ({sha: d?.sha, author: d?.login?.author, message: d?.commit?.message })
        );
    }
}
