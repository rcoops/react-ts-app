import React, {Component} from "react";

export default class ShoppingList extends Component<any, any> {
    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div className={"shopping-list"}>
                <h1>Git Commits for {this.props.name}'s repo</h1>
                <ul>
                    {this.props.gitCommits.map((value: string) => (<li>{value}</li>))}
                </ul>
            </div>
        );
    }
}
