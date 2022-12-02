import { Draggable } from "react-beautiful-dnd"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { DeleteCardAC } from "../reducers/listReducer"
import { DeleteButton } from "./Button"
import { useEffect, useState } from "react"
import { Modal } from "./modal"
import dayjs from "dayjs"
export const TimeTable = styled.span`
width:100px;
margin:5px;
`
export const TaskCard = styled.div`
margin:5px auto;
padding: 10px;
width:90%;
background:#ededed;
border:1px solid lightgrey;
border-radius:5px;
`
const Paragraph = styled.p`
    min-height:60px;
    padding:10px;
    background:#fff;
    border-radius:5px;
    border:1px solid lightgrey;

`
const style = {
    display: 'flex',
    flexDirection: 'row-reverse'
}
export const Card = (props) => {
    const [modalId, setModalId] = useState(null)
    const dispatch = useDispatch()
    const DeleteCard = () => {
        dispatch(DeleteCardAC(props.CardId, props.ListId))
    }
    // debugger
    return (<>
        <Draggable draggableId={String(props.CardId)} index={props.index}>
            {provided => (
                <TaskCard
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div style={style}>

                        <DeleteButton onClick={() => DeleteCard()}>×</DeleteButton>
                        <DeleteButton style={{ paddingTop: '3px', fontSize: '13px' }} onClick={() => {
                            setModalId(props.CardId)
                        }}>□</DeleteButton>
                    </div>
                    <h2 style={{ margin: '0' }}>{props.title}</h2>
                    <Paragraph >{props.main}</Paragraph>
                    <TimeTable>
                        <span>Created at:</span>
                        <br />
                        {dayjs(props.card.created).format('H:mm MMM-DD')}
                    </TimeTable>

                </TaskCard>
            )}

        </Draggable >
        {modalId == props.CardId &&
            <Modal
                ListId={props.ListId}
                subs={props.subs}
                card={props.card}
                setModalId={setModalId} />
        }
    </>
    )
}

