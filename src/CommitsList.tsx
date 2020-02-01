import React, {Component} from "react";
import { GitCommit } from "./app";
import axios from "axios";

export default class CommitsList extends Component<any, any> {

    private timerId: NodeJS.Timeout | null = null;

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {commits: new Array<GitCommit>()}
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
        const commits = await CommitsList.getGithubCommits();
        this.setState({commits})
    }

    private static async getGithubCommits(): Promise<GitCommit[]> {
        const response = await axios.get('https://api.github.com/repos/rcoops/react-ts-app/commits');
        const commits = response.data.map((d: any) =>
            ({sha: d?.sha, author: d?.author?.login, message: d?.commit?.message })
        );
        return commits;
    }
}
