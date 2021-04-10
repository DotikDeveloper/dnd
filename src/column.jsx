import React, { Component } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Card, CardBody, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

class Column extends Component {
    render() {
        return (
            <div className="card-container">
                <Card>
                    <CardBody>
                        <CardTitle tag="h2">{this.props.column.title}</CardTitle> 
                            <Droppable droppableId={this.props.column.id}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={'h-100'}
                                    >
                                    <ListGroup
                                        className={'h-100'}
                                    >
                                        {
                                            this.props.tasks.map((task, index) => (
                                                <Draggable
                                                    key={task.id}
                                                    draggableId={task.id}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                        >
                                                            <ListGroupItem
                                                                className="mb-3"
                                                            >
                                                                {task.content}
                                                            </ListGroupItem>
                                                        </div>
                                                    )}
                                                </Draggable>
                                                )
                                            )
                                        }
                                        {provided.placeholder}
                                    </ListGroup>
                                    </div>
                                )}
                            </Droppable>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Column;