import React from "react";
import {Adapter, RaisedButton} from "material-ui";
import {logout} from "../helpers/auth";
import '../TodoList.css'
import TodoItems from './TodoItems';

const appTokenKey = "appToken"; // also duplicated in Login.js
export default class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           items: []
            //firebaseUser: JSON.parse(localStorage.getItem("firebaseUser"))
        };

        //console.log("User:", this.state.firebaseUser);
        this.handleLogout = this.handleLogout.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }


    handleLogout() {
        logout().then(function () {
            localStorage.removeItem(appTokenKey);
            this.props.history.push("/login");
            console.log("user signed out from firebase");
        }.bind(this));

    }
    addItem(e) {
    if(this._inputElement.value !== ""){
      let newItem = {
        text: this._inputElement.value,
        key: Date.now()
      };

      this.setState((prevState) => {
        return{
          items: prevState.items.concat(newItem)
        };
      });
    }
    this._inputElement.value = "";

    console.log(this.state.items);

    e.preventDefault();
  }

  deleteItem(key){
    const filteredItems = this.state.items.filter(function(item) {
      return(item.key !== key)
    });
    this.setState({
      items: filteredItems
    });
  }

    render() {
        return (
            <div className="todoListMain">

                <h2>My Todo</h2>
             <div className="Button">
                <RaisedButton
                    backgroundColor="#a4c639"
                    labelColor="#ffffff"
                    label="Sign Out"
                    onTouchTap={this.handleLogout}
                />
              </div>
     <br/>
     <hr/>
     <br/>
      <div className="header">
        <form>
        <input ref={(a) => this._inputElement = a} placeholder="What needs to be done?">
          </input>
          <button type="submit" onClick={this.addItem}>Add</button>
        </form>
      </div>
  <TodoItems entries={this.state.items} delete={this.deleteItem} />
            </div>
        );
    }
}
