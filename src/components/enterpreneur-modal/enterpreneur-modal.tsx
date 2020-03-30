import { Button, Cascader, Form, Input, Select } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import axios from 'axios';
import * as React from 'react';
import { Component } from 'react';
import { Client, ClientType } from '../../models/client.model';
import './enterpreneur-modal.css';
import { FormInstance } from 'antd/lib/form';

type ClientModalProps = {
    visible: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    client: Client | null | undefined;
}

type ClientModalState = {
    loading: boolean;
    founders: Founder[];
    founderOpitons: any[];
    currentType: string | null;
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

interface Founder {
    id: number;
    tin: string;
    name: string;
    clientId?: number;
    createDate: string;
    updateDate: string;
}

export class EnterpreneurModal extends Component<ClientModalProps, ClientModalState> {
    state = {
        loading: false,
        founders: [],
        founderOpitons: [],
        currentType: null
    };
    formRef = React.createRef<FormInstance>();
    onTypeChange = () => {
        this.setState({ currentType: this.formRef.current?.getFieldsValue().type[0] });
    }
    onFinish = (client: Client) => {
        if (this.client) {
            client.id = this.client.id;
            client.type = ClientType[client.type[0]];
            client.founders.forEach((element) => {
                console.log(element);
                //TODO Добавить учредителей
            });
            this.setState({ loading: true });
            axios.put('/api/Client/' + this.client.id, client).then((res) => {
                this.setState({ loading: false });
                this.props.handleOk();
            });
        } else {
            client.type = ClientType[client.type[0]];
            this.setState({ loading: true });
            axios.post('/api/Client', client).then((res) => {
                this.setState({ loading: false });
                this.props.handleOk();
            });
        }
    };
    client: Client = this.props.client as Client;
    componentDidMount() {
        axios.get('/api/Founder').then((res: { data: Founder[] }) => {
            this.setState({ founders: res.data });
            const founderOpitons = res.data.map((founder: Founder) => {
                return {
                    label: founder.name,
                    value: founder.id
                }
            });
            this.setState({ founderOpitons: founderOpitons });
            console.log(founderOpitons);
        });

    }
    render() {
        if (this.state.founderOpitons.length > 0) {
            return (
                <Modal
                    visible={this.props.visible}
                    title={this.client ? 'Редактировать клиента' : 'Добавить клиента'}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                    footer={null}
                >
                    <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 14 }}
                        layout="horizontal"
                        onFinish={this.onFinish}
                        initialValues={this.client}
                        ref={this.formRef}
                        {...layout}
                    >
                        <Form.Item
                            label="ИНН"
                            name="tin"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите ИНН',
                                },
                                {
                                    len: 12,
                                    message: 'Неправильный ИНН'
                                }
                            ]}
                        >
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item
                            label="Наименованиие"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите наименование',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Тип"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Необходимо выбрать тип',
                                },
                            ]}
                        >
                            <Cascader
                                placeholder="Выберите тип"
                                onChange={this.onTypeChange}
                                options={[
                                    {
                                        value: ClientType.IP,
                                        label: 'Индивидуальный предприниматель',
                                    },
                                    {
                                        value: ClientType.UL,
                                        label: 'Юридическое лицо',
                                    }
                                ]}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Учредители"
                        >
                            {this.state.currentType === 'UL' ? <Select
                                placeholder="Выберите учредителя"
                                mode="multiple"
                                options={this.state.founderOpitons}
                            /> : <Cascader
                                placeholder="Выберите учредителя"
                                options={this.state.founderOpitons}
                            />}
                        </Form.Item>
                        <div className="ant-modal-footer">
                            <Button
                                key="back"
                                onClick={this.props.handleCancel}
                            >Отмена</Button>
                            <Form.Item>
                                <Button
                                    className="add-btn"
                                    type="primary"
                                    htmlType="submit"
                                    loading={this.state.loading}
                                >Принять</Button>
                            </Form.Item>
                        </div>
                    </Form>
                </Modal>
            )
        } else {
            return null;
        }
    }
}