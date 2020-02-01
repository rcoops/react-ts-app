import React, {Component} from "react";
import { GitCommit } from "./app";
import axios from "axios";
import Octokit from '@octokit/rest';

export default class CommitsList extends Component<any, any> {

    private timerId: NodeJS.Timeout | null = null;
    private octokit: Octokit;

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {commits: new Array<GitCommit>()}
        this.octokit = new Octokit();
    }

    async componentDidMount(): Promise<void> {
        this.updateGithubCommits()
        this.timerId = setInterval(() => this.updateGithubCommits(), 20000)
    }

    componentWillUnmount(): void {
        if (this.timerId) {
            clearInterval(this.timerId as NodeJS.Timeout);
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className={"shopping-list"}>
                <h1>Git Commits for {this.props.name}'s repo</h1>
                <ul>
                    {this.state.commits.map((value: GitCommit) => (<li key={value.sha}>{value?.sha}({value?.author}): {value?.message}</li>))}
                </ul>
            </div>
        );
    }

    private async updateGithubCommits(): Promise<void> {
        const commits = await this.getGithubCommits();
        this.setState({commits})
    }

    private async getGithubCommits(): Promise<GitCommit[]> {
        // const s = this.octokit.search.commits({})
        const response = await axios.get('https://api.github.com/repos/rcoops/react-ts-app/commits');
        const commits = response.data.map((d: any) =>
            ({sha: d?.sha, author: d?.author?.login, message: d?.commit?.message })
        );
        return commits;
    }
}
