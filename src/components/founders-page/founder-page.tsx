import * as React from 'react';
import './founder-page.css';
import { Layout } from 'antd';
const { Content } = Layout;

export class FounderPage extends React.Component<{}, {}> {
    state = {

    };

    render() {
        return (
            <Content className="page-layout-background">
                <h1>Учредители</h1>
            </Content>
        )
    }
}
