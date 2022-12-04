import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addSubAC, deleteSubAC, SaveChangesAC } from "../reducers/listReducer";
import { ActionButton, Button, CloseBtn, DeleteButton } from "./Button";
import { TimeTable } from "./card";
// Styled & Styles
const ModalContainer = styled.div`
position:fixed;
height:100vh;
width:100vw;
top:0;
left:0;
display:flex;
align-items:center;
justify-content:center;
background-color:rgba(0,0,0,0.4);
color white
`
const ModalContent = styled.div`
width:600px;
height:400px;
padding:10px;
background:#ededed;
color:black;
`
const Section = styled.div`
display:flex;
flex-direction: column;
`
const EditField = styled.textarea`
min-height:80px;
font-size:16px;
border:none;
outline:none;
margin-bottom:5px;
`
const SubSection = styled.div`
display:flex;
justify-content:space-between;
background:#fff;
border:1px lightgrey solid;
margin-bottom:2px;
`

export const Modal = ({ ListId, subs, card, setModalId, }) => {
    const [titleValue, setTitlevalue] = useState(card.title) //стейт заголовка
    const [mainValue, setMainvalue] = useState(card.main)//стейт описания задачи
    const [create, setCreate] = useState(false) //стейт режима редактирования
    const [addSub, setAddSub] = useState(false) //стейт добавления подзадачи
    const [subValue, setValue] = useState('') //стейт содержания подзадаччи
    const dispatch = useDispatch()
    /**
     * эта функция добавляет новую подзадачу в стейт
     */
    const SaveSub = (ListId, CardId, text) => {
        dispatch(addSubAC(ListId, CardId, text))
        setAddSub(false)
    }
    const DeleteSub = (ListId, SubTaskId, CardId) => {
        dispatch(deleteSubAC(ListId, SubTaskId, CardId))
    }
    const SaveChanges = (ListId, CardId, title, main) => {
        dispatch(SaveChangesAC(ListId, CardId, title, main))
        setCreate(false)
    }
    // debugger
    return <ModalContainer>
        <CloseBtn onClick={() => setModalId(null)}>×</CloseBtn>
        <ModalContent>
            {!create ?
                <Section>
                    <h2>{titleValue}</h2>
                    <p style={{ background: '#fff', minHeight: '60px' }}>{mainValue}</p>
                    <ActionButton style={{ marginLeft: '0' }} onClick={() => setCreate(true)}>Edit</ActionButton>
                </Section>
                :
                <Section>
                    <EditField style={{ fontSize: '24px', fontWeight: 'bold', height: '20px' }} value={titleValue} onChange={(e) => setTitlevalue(e.target.value)} placeholder="title" />
                    <EditField value={mainValue} onChange={(e) => setMainvalue(e.target.value)} />
                    <div style={{ display: 'flex' }}>
                        <ActionButton onClick={() => SaveChanges(ListId, card.id, titleValue, mainValue)}>Save</ActionButton>
                        <ActionButton onClick={() => setCreate(false)}>Cancel</ActionButton>
                    </div>
                </Section>
            }
            {card.subTasks.map(item => {

                return <SubSection>
                    <div>
                        <input type="checkbox" name="subtask" id="" />
                        {item.text}
                    </div>
                    <DeleteButton onClick={() => { DeleteSub(ListId, item.id, card.id) }}>×</DeleteButton>
                </SubSection>

            })}
            {
                addSub ?
                    <div style={{ left: '0' }}>
                        <input onChange={(e) => { setValue(e.target.value) }} />
                        <div>
                            <ActionButton onClick={() => SaveSub(ListId, card.id, subValue)}>Save</ActionButton>
                            <ActionButton onClick={() => setAddSub(false)}>Cancel</ActionButton>
                        </div>
                    </div>
                    : <ActionButton onClick={() => setAddSub(true)} >Add Subtask</ActionButton>
            }
            <br />
            <TimeTable>
                <span>Created at:</span>
                <br />
                {dayjs(card.created).format('H:mm MMM-DD')}
            </TimeTable>
        </ModalContent>
    </ModalContainer>
}