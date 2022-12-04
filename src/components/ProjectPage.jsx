import styled from "styled-components"
import { useSelector } from "react-redux"
import { TaskColumn } from "./column"
import { DragDropContext } from "react-beautiful-dnd"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { SortAC } from "../reducers/listReducer"

const ProjectContainer = styled.div`
margin:0 auto; 
display:grid;
grid-template-columns: 1fr 1fr 1fr;
grid-gap:20px;
width: 80%;
height:100vh;
font-family: 'Roboto', sans-serif;
`
export const Project = () => {
    const lists = useSelector(state => state.list)
    const dispatch = useDispatch()
    const onDragEnd = (result) => {
        const { destination, source, draggableId } = result
        // debugger
        if (!destination) {
            return
        }
        dispatch(SortAC(
            source.droppableId,
            destination.droppableId,
            source.index,
            destination.index,
            draggableId

        ))
    }
    // debugger
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <ProjectContainer>
                {lists.map(item => {
                    return (
                        <TaskColumn id={item.id} key={item.id} title={item.title} cards={item.cards} />
                    )

                    { }
                })}
            </ProjectContainer>
        </DragDropContext>

    )
}