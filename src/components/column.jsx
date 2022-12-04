import { useState } from "react"
import { Droppable } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { SaveNewCardAc } from "../reducers/listReducer"
import { ActionButton, Button } from "./Button"
import { Card, TaskCard } from "./card"

//Styled & Styles
const Column = styled.div`
border-radius:3px;
display:flex;
flex-direction:column;
color:d#383838;
`
const CreateCardItem = styled(TaskCard)`
display:grid;
grid-template-rows:1fr 2fr 1fr;
grid-row-gap:2px;
`
const ListHeader = styled.h1`
display:block;
font-size:24px;
margin:5px auto;
padding: 5px 10px;
background:rgba(0,0,0,0.1);

`
let outline = { outline: 'none' }
export const TaskColumn = (props) => {

    //hooks & functions

    const dispatch = useDispatch()
    const [create, setCreate] = useState(null) //создание записи
    const [titleValue, setTitleValue] = useState('') //заголовок задачи
    const [mainValue, setMainValue] = useState('') //описание задачи

    /**
     * эта функция сохраняет созданную карточку
     */
    const SaveCard = () => {
        dispatch(SaveNewCardAc(titleValue, mainValue))
        setCreate(null)
        setTitleValue('')
        setMainValue('')
    }

    return (
        <Droppable droppableId={String(props.id)}>
            {provided => (
                <Column {...provided.droppableProps} ref={provided.innerRef} >

                    <ListHeader>{props.title}</ListHeader>
                    {props.cards.map((card, index) => <Card
                        stat={props.title}
                        card={card}
                        index={index}
                        ListId={props.id}
                        CardId={card.id}
                        key={card.id}
                        title={card.title}
                        main={card.main} />)}
                    {create === 0 &&
                        <CreateCardItem>
                            <input style={outline} onChange={(e) => setTitleValue(e.target.value)} placeholder="title" />
                            <textarea style={outline} onChange={(e) => setMainValue(e.target.value)} />
                            <div style={{ display: 'flex' }}>
                                <ActionButton onClick={() => { SaveCard() }}>Save</ActionButton>
                                <ActionButton onClick={() => { setCreate(null) }}>Cancel</ActionButton>
                            </div>
                        </CreateCardItem>
                    }

                    {props.id == 0 && <Button onClick={() => setCreate(0)}>+ Add new task</Button>}
                    {provided.placeholder}
                </Column>
            )}
        </Droppable>
    )
}