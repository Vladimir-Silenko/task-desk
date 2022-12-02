const SAVE_NEW_CARD = 'SAVE_NEW_CARD'
const DELETE_CARD = 'DELETE_CARD'
const ADD_SUBTASK = 'ADD_SUBTASK'
const DELETE_SUBTASK = 'DELETE_SUBTASK'
const SAVE_CHANGES = 'SAVE_CHANGES'
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
                created: new Date().getTime()
            },
        ],
        subTasks: [
            { id: 1, belongsTo: 1, text: '' },
            { id: 2, belongsTo: 1, text: '' },
            { id: 3, belongsTo: 1, text: '' },
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
                created: new Date().getTime()
            },
            {
                id: 3,
                title: 'Card2',
                main: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, quae quo explicabo sapiente recusandae dicta ex aut? Repellendus, earum beatae! Cumque modi debitis minus earum ducimus et aperiam dolore dolorem!',
                stat: '',
                created: new Date().getTime()
            },
            {
                id: 4,
                title: 'Card2',
                main: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, quae quo explicabo sapiente recusandae dicta ex aut? Repellendus, earum beatae! Cumque modi debitis minus earum ducimus et aperiam dolore dolorem!',
                stat: '',
                created: new Date().getTime()
            },
        ],
        subTasks: [{ id: 1, belongsTo: 4, text: 'Subtask' },],


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
                created: new Date().getTime()
            },
        ],
        subTasks: [],
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
                            belongsTo: list.id,
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
                        subTasks: [...list.subTasks, { id: list.subTasks.length + 1, belongsTo: action.CardId, text: action.text }]
                    }
                }
                else return list
            })
            return newState
        }
        case DELETE_SUBTASK: {
            const newState = state.map(list => {
                if (list.id === action.ListId) {
                    console.log(action.SubTaskId)
                    return {
                        ...list,
                        subTasks: [...list.subTasks.filter(item => item.id != action.SubTaskId)]

                    }
                }
                else return list
            })
            return newState
        }
        default:
            return state
    }
}
export const SaveNewCardAc = (title, main) => ({ type: SAVE_NEW_CARD, title: title, main: main })
export const DeleteCardAC = (CardId, ListId) => ({ type: DELETE_CARD, CardId: CardId, ListId: ListId })
export const addSubAC = (ListId, CardId, text) => ({ type: ADD_SUBTASK, ListId: ListId, CardId: CardId, text: text })
export const deleteSubAC = (ListId, SubTaskId) => ({ type: DELETE_SUBTASK, ListId: ListId, SubTaskId: SubTaskId })
export const SaveChangesAC = (ListId, CardId, TitleVAlue, MainValue) => ({
    type: SAVE_CHANGES,
    ListId: ListId,
    CardId: CardId,
    title: TitleVAlue,
    main: MainValue,
})