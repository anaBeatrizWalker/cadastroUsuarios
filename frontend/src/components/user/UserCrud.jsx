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

    render(){
        return (
            <Main {...headerProps}>
                Cadastro
            </Main>
        )
    }
}