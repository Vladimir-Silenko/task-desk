const SAVE_NEW_CARD = 'SAVE_NEW_CARD'
const DELETE_CARD = 'DELETE_CARD'
const ADD_SUBTASK = 'ADD_SUBTASK'
const DELETE_SUBTASK = 'DELETE_SUBTASK'
const SAVE_CHANGES = 'SAVE_CHANGES'
const DRAG_HAPPENED = 'DRAG_HAPPENED'

const initialState = [
    {
        id: 0,
        title: 'Queue',
        cards: [
            {
                id: 1,
                title: 'Card1',
                main: 'card1',
                stat: '',
                created: new Date().getTime(),
                subTasks: [
                    { id: 1, belongsTo: 1, text: 'TExt' },
                    { id: 2, belongsTo: 1, text: 'text' },
                    { id: 3, belongsTo: 1, text: 'Text' },
                ],
            },
        ],

    },
    {
        id: 1,
        title: 'In development',
        cards: [
            {
                id: 2,
                title: 'Card2',
                main: 'card1',
                stat: '',
                created: new Date().getTime(),
                subTasks: []
            },
            {
                id: 3,
                title: 'Card2',
                main: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, quae quo explicabo sapiente recusandae dicta ex aut? Repellendus, earum beatae! Cumque modi debitis minus earum ducimus et aperiam dolore dolorem!',
                stat: '',
                created: new Date().getTime(),
                subTasks: [{ id: 1, belongsTo: 4, text: 'Subtask' },],
            },
            {
                id: 4,
                title: 'Card2',
                main: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, quae quo explicabo sapiente recusandae dicta ex aut? Repellendus, earum beatae! Cumque modi debitis minus earum ducimus et aperiam dolore dolorem!',
                stat: '',
                created: new Date().getTime(),
                subTasks: [{ id: 1, belongsTo: 4, text: 'Subtask' },],
            },
        ],



    },
    {
        id: 2,
        title: 'Done',
        cards: [
            {
                id: 5,
                title: 'Card3',
                main: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, quae quo explicabo sapiente recusandae dicta ex aut? Repellendus, earum beatae! Cumque modi debitis minus earum ducimus et aperiam dolore dolorem!',
                stat: '',
                created: new Date().getTime(),
                subTasks: [{ id: 1, belongsTo: 4, text: 'Subtask' },],
            },
        ],
    },
]
export const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_NEW_CARD: {
            const newState = state.map(list => {
                if (list.id === 0) {
                    return {
                        ...list,
                        cards: [...list.cards, {
                            id: list.cards.length + 8,
                            title: action.title,
                            main: action.main,
                            subTasks: [],
                            created: new Date().getTime()
                        }]
                    }
                }
                else return list
            })
            return newState

        }
        case SAVE_CHANGES: {
            const newState = state.map(list => {
                if (list.id === action.ListId) {
                    return {
                        ...list,
                        cards: [...list.cards.map(card => {
                            if (card.id == action.CardId) {
                                return {
                                    ...card,
                                    title: action.title,
                                    main: action.main,
                                }
                            }
                            else return card
                        })]
                    }
                }
                else return list
            })
            return newState
        }
        case DELETE_CARD: {

            const newState = state.map(list => {
                if (list.id === action.ListId) {
                    return {
                        ...list,
                        cards: [...list.cards.filter(item => item.id != action.CardId)]
                    }
                }
                else return list
            })
            return newState

        }
        case ADD_SUBTASK: {
            const newState = state.map(list => {
                if (list.id === action.ListId) {
                    return {
                        ...list,
                        cards: [...list.cards.map(card => {

                            if (action.CardId == card.id) {
                                console.log('yes')
                                return {
                                    ...card,
                                    subTasks: [...card.subTasks, { id: Math.random(), text: action.text }]
                                }
                            }
                            else return card
                        })]
                    }
                }
                else return list
            })
            return newState
        }
        case DELETE_SUBTASK: {
            const newState = state.map(list => {
                if (list.id === action.ListId) {
                    return {
                        ...list,
                        cards: [...list.cards.map(card => {
                            if (card.id == action.CardId) {
                                return {
                                    ...card,
                                    subTasks: [...card.subTasks.filter(item => item.id != action.SubTaskId)]
                                }
                            }
                        })]

                    }
                }
                else return list
            })
            return newState
        }
        case DRAG_HAPPENED:
            const {
                droppableIdStart,
                droppableIdEnd,
                droppableIndexStart,
                droppableIndexEnd,
                draggableId
            } = action.payload
            const newState = [...state];

            if (droppableIdStart === droppableIdEnd) { // same list
                const list = state.find(item => item.id == droppableIdStart)

                const card = list.cards.splice(droppableIndexStart, 1)
                list.cards.splice(droppableIndexEnd, 0, ...card)
            }
            return newState

        default:
            return state
    }
}
export const SaveNewCardAc = (title, main) => ({ type: SAVE_NEW_CARD, title: title, main: main })
export const DeleteCardAC = (CardId, ListId) => ({ type: DELETE_CARD, CardId: CardId, ListId: ListId })
export const addSubAC = (ListId, CardId, text) => ({ type: ADD_SUBTASK, ListId: ListId, CardId: CardId, text: text })
export const deleteSubAC = (ListId, SubTaskId, CardId) => ({ type: DELETE_SUBTASK, ListId: ListId, SubTaskId: SubTaskId, CardId: CardId })
export const SaveChangesAC = (ListId, CardId, TitleVAlue, MainValue) => ({
    type: SAVE_CHANGES,
    ListId: ListId,
    CardId: CardId,
    title: TitleVAlue,
    main: MainValue,
})
export const SortAC = (
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId

) => {
    return {
        type: 'DRAG_HAPPENED',
        payload: {
            droppableIdStart,
            droppableIdEnd,
            droppableIndexStart,
            droppableIndexEnd,
            draggableId
        }

    }
}