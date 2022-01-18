import React, { Component } from "react"
import axios from 'axios'
import Main from "../template/Main"

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de Usuários: Incluir, Listar, Alterar e Excluir'
}

//URL do backend
const baseURL = 'http://localhost:3001/users'
//Estado inicial
const initialState = {
    user: {name: '', email: ''},
    list: []
}

export default class UserCrud extends Component{

    state = {...initialState}

    //Limpar o form depois de ser preenchido
    clear(){
        this.setState({user: initialState.user})
    }

    //Salvar
    save(){
        const user = this.state.user
        //Se o id estiver setado, altera, senão inclui
        const method = user.id ? 'put' : 'post'
        //Se o id estiver setado, url com id
        const url = user.id ? `${baseURL}/${user.id}` : baseURL
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({user: initialState.user, list})
            })
    }

    getUpdatedList(user){
        const list = this.state.list.filter(u => u.id !== user.id) //se o id do user é diferente, remove e reposiciona o user na primeira posição
        list.unshift(user)
        return list
    }

    //Atualiza os campos
    updateField(event){
        const user = {...this.state.user}
        user[event.target.name] = event.target.value //pega o name do input
        this.setState({user})
    }

    renderForm(){
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" 
                            className="form-control" 
                            name="name" 
                            value={this.state.user.name} 
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o nome"/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                            name="email"
                            value={this.state.user.email}
                            onChange={e => this.updateField(e)}
                            placeholder="Digite o e-mail"/>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                        onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                        onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        return (
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}