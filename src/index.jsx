import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';



const TodoForm = ({addTodo}) => {

  let input;

  return (
    <div>
      <input ref={node => {
      input = node;
    }} />
      <button onClick={() => {
        addTodo(input.value);
        input.value = '';
      }} />
    </div>
  )

}
const Todo = ({todo, remove}) => {

  return(
    <li onClick={() =>(remove(todo.id)) } >{todo.text}</li>
  );
}

const TodoList = ({todos, remove}) => {


      const todoNode = todos.map((todo) => {
        return(
          <Todo todo={todo} key={todo.id} remove={remove} />
        );
      });

    return (<ul>{todoNode}</ul>);
})

const Title = ({toDolength}) => {
 return(
  <div>
    <div>
      <h1>To-do Form ({toDolength})</h1>
    </div>
  </div>
 );
}

window.id = 0;
class TodoApp extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data : []
    }

    this.apiUrl = 'https://57b1924b46b57d1100a3c3f8.mockapi.io/api/todos';
  }

  addTodo(val) {
    const todo = {text: val, id: window.id++ }
    this.state.data.push(todo);
    this.setState({data: this.state.data});
  }

  handleRemove(id) {

    const remainder = this.state.data.filter((todo) => {
        if(todo.id != id) return todo;
    });

    this.setState({ data: remainder  });
  }

  render() {
    return (
      <div>
        <Title toDolength={this.state.data.length} />
        <TodoForm addTodo={this.addTodo.bind(this)} />
        <TodoList todos={this.state.data} remove={this.handleRemove.bind(this)} />
      </div>
    );
  }

}

ReactDOM.render(<TodoApp />, document.getElementById('container'));
