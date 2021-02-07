import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import service from '../service/chave.service';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'


class New extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Marca: '',
            NumeroSerie: '',
            Quantidade: '',
            Tipo: 'Plana',
            Data: ''
        };

        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        const { Marca, NumeroSerie, Quantidade, Tipo, Data } = this.state;

        if (Marca !== '' && NumeroSerie !== '' && Quantidade !== '' && Tipo !== '' && Data !== '') {
            service.post(this.state);
            alert('Cadastrado com sucesso');
            this.limpaForm();
        }
        else {
            alert('Preencha todos os campos');
        }
    }

    limpaForm() {
        this.setState({
            Marca: '',
            NumeroSerie: '',
            Quantidade: '',
            Tipo: 'Plana',
            Data: ''
        })
    }

    render() {
        return (
            <Container style={{ background: 'white' }}>
                <h1>
                    Cadastrar Chaves
                 </h1>
                <Link to="/Chaves">
                    Voltar
                 </Link>
                <Form
                    onSubmit={(data) => this.submitForm(data)}>
                    <Row>
                        <Col sm={3}>
                            <Form.Group>
                                <Form.Label>Marca:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Marca"
                                    value={this.state.Marca}
                                    onChange={(e) => this.setState({ Marca: e.target.value })}
                                />
                            </Form.Group>
                        </Col>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                        </Form.Text>
                        </Form.Group>
                    </Row>
                    <button
                        className="btn-Primary"
                        type="submit">
                        Cadastrar
             </button>
                </Form>
            </Container>
            // <div className="container">
            //     <h1>
            //         Cadastrar Chaves
            //     </h1>
            //     <Link to="/Chaves">
            //         Voltar
            // </Link>
            /* <form
                className="form-Chaves"
                onSubmit={(e) => this.submitForm(e)}>
                <label>Marca: </label>
                <input
                    type="text"
                    autoFocus
                    value={this.state.Marca}
                    onChange={(e) => this.setState({ Marca: e.target.value })} />
                <br />
                <label>Número de Série: </label>
                <input
                    type="text"
                    value={this.state.NumeroSerie}
                    onChange={(e) => this.setState({ NumeroSerie: e.target.value })} />
                <br />
                <label>Quantidade: </label>
                <input
                    type="number"
                    value={this.state.Quantidade}
                    onChange={(e) => this.setState({ Quantidade: e.target.value })} />
                <br />
                <label>Data: </label>
                <input
                    type="text"
                    value={this.state.Data}
                    onChange={(e) => this.setState({ Data: e.target.value })} />
                <br />
                <label>Tipo da Chave: </label>
                <select onChange={(e) => this.setState({ Tipo: e.target.value })}>
                    <option value="Plana">Plana</option>
                    <option value="Automotiva">Automotiva</option>
                    <option value="Metálica">Metálica</option>
                    <option value="Plástica">Plástica</option>
                    <option value="PlaTransponderna">Transponder</option>
                    <option value="Tetra">Tetra</option>
                    <option value="Automotiva">Automotiva de aço</option>
                    <option value="Gorje">Gorje</option>
                    <option value="PlanaColorida">Plana Colorida</option>
                    <option value="Especial">Especial</option>
                    <option value="Zamak">Zamak sem canal</option>
                    <option value="Cofre">Cofre</option>
                    <option value="Tubular">Tubular</option>
                    <option value="AutomotivaLogo">Automotiva logo</option>
                    <option value="PlanaAlumínio">Plana de Alumínio</option>
                </select>
                <br />
                
            </form> */
            // </div>
        );
    }
}

export default withRouter(New);