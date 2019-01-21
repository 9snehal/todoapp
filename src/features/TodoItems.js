import React from 'react';
import '../TodoList.css';

export default class TodoItems extends React.Component{
  constructor(props){
    super(props);
    this.createTask = this.createTask.bind(this);
  };

  createTask(item){
    return <li key={item.key}>{item.text}<button className="btn btn1" onClick={() => this.delete(item.key)}>x</button>
    <button className="btn">Edit</button>
    </li>

  }

    delete(key){
    this.props.delete(key);
  }

  render(){
    let todoEntries = this.props.entries;
    let listItems = todoEntries.map(this.createTask);
    return(
      <ul className="todoList">
       {listItems}
      </ul>
    )
  }
}
