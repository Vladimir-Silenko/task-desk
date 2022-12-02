import styled from "styled-components"
import { useSelector } from "react-redux"
import { TaskColumn } from "./column"
import { DragDropContext } from "react-beautiful-dnd"
import { useState } from "react"

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
    // debugger
    return (
        <DragDropContext onDragEnd={''}>
            <ProjectContainer>
                {lists.map(item => {
                    return (
                        <TaskColumn subs={item.subTasks} id={item.id} key={item.id} title={item.title} cards={item.cards} />
                    )

                    { }
                })}
            </ProjectContainer>
        </DragDropContext>

    )
}