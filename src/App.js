import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {

    removeTodo = (index) => {
        let todos = this.state.todos;

        let todo = todos.find(function (todo) {
            return todo.counter === index
        });

        todos.splice(todo, 1);
        this.setState({
            todos: todos
        })
    };

    handleSearch = (event) => {
        let arr = event.target.value.toLowerCase();
        let todos = this.state.todos;
        let todo = todos.filter(function (el) {
            let searchElement = el.name.toLowerCase();
            console.log(searchElement);
            return searchElement.indexOf(arr) !== 1;
        })

    };


    addTodo = (event) => {
        event.preventDefault();
        let name = this.refs.name.value;
        let priority = this.refs.priority.value;
        let description = this.refs.description.value;
        let date = this.refs.date_number.value;
        let counter = this.state.counter;
        let todo = {
            name,
            description,
            counter,
            priority,
            date
        };
        counter += 1;

        if (name <= 0 || description <= 0) {
            alert('Заполните обязательные поля!');
        } else {
            let todos = this.state.todos;
            todos.push(todo);

            this.setState({
                todos: todos,
                counter: counter
            });
            this.refs.todoForm.reset();
        }
    };

    constructor() {
        super();
        this.state = {
            todos: [],
            static: [],
            title: 'Список моих дел',
            counter: 0,
        }
    }


    render() {
        let title = this.state.title;
        let todos = this.state.todos;
        return (
            <div className="App">
                    Поиск <input type="text" style={{width:'50%'}} onChange={this.handleSearch}/>
                <h1 className="title">{title}</h1>
                <form ref="todoForm">
                    <br/>
                    Название:<input type="text" ref="name" placeholder="введите текст"/>
                    <br/>
                    Описание:<input type="text" ref="description" placeholder="введите текст"/>
                    <br/>
                    Дата:<input type="text" ref="date_number" placeholder="введите текст" style={{marginLeft: '38px'}}/>
                    <br/>
                    Приоритет: <select ref="priority" style={{width: '50%'}}>
                    <option value="Обычная">Обычная</option>
                    <option value="Важная">Важная</option>
                    <option value="Очень важная">Очень важная</option>
                </select>
                    <br/>
                    <br/>
                    <button className="success" onClick={this.addTodo}>Создать задачу</button>
                </form>
                <table>
                    <tbody>
                    <tr>
                        <th>Название</th>
                        <th>Описание</th>
                        <th>Приоритет</th>
                        <th>Дата</th>
                        <th></th>
                    </tr>
                    </tbody>
                </table>
                {todos.map((todo) =>
                    <table key={todo.counter}>
                        <tbody>
                        <tr>
                            <td>{todo.name}</td>
                            <td>{todo.description}</td>
                            <td>{todo.priority}</td>
                            <td>{todo.date}</td>
                            <td>
                                <button className="delete" onClick={this.removeTodo.bind(null, todo.counter)}>
                                    Удалить
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default App;
