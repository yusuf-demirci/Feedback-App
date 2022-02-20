import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {

    const [feedback, setFeedback] = useState([
        {
            id: 1,
            text: "This feedback item 1.",
            rating: 8
        },
        {
            id: 2,
            text: "This feedback item 2.",
            rating: 7
        },
        {
            id: 3,
            text: "This feedback item 3.",
            rating: 6
        },
    ])

    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })

    // delete feedback
    function deleteFeedback(id) {
        if (window.confirm("Are you sure you want to delete?")) {
            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }

    // add feedback)
    function addFeedback(newFeedback) {
        newFeedback.id = uuidv4();
        setFeedback([newFeedback, ...feedback])
    }

    // set item to be updated
    function editFeedback(item){
        setFeedbackEdit({
            item,
            edit: true
        })
    }

    // update feedback item
    function updateFeedback(id, updItem){
        setFeedback(feedback.map(item => {
            return item.id === id ? {...item, ...updItem} : item
        }))
    }

    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
    }}>
        {children}
    </FeedbackContext.Provider>
}

export default FeedbackContext;