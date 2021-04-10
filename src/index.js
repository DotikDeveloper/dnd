import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css'
import Column from './column';
import initialData from './initial-data';
import { DragDropContext } from 'react-beautiful-dnd';

class App extends Component {
  state = initialData;

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if(!destination) {
      return;
    }

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if(start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...start,
      taskIds: newTaskIds,
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      }
    }

    this.setState(newState);
    return;
    }

    // TODO: moving to another list
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    }
    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext
        // onDragStart
        // onDragUpdate
        onDragEnd = {this.onDragEnd}
      >
          {
            this.state.columnOrder.map((columnId) => {
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map((taskId) => this.state.tasks[taskId]);
              return <Column key={column.id} column={column} tasks={tasks}/>;
            })
          }
      </DragDropContext>
      )
  }
}


ReactDOM.render(
    <App />,
  document.getElementById('root')
);
