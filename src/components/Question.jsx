import React from 'react'


const getQuestions = ()=>{
fetch("http://localhost:8080/questions")
.then(response => response.json())
.catch(error => console.error('Error:', error))
.then(data =>setQuestion(data))
.then(data => console.log(data));
}

export default function Question() {
    const [question, setQuestion] = useState([]);

    return (
        <div onClick={getQuestions}>
            <h1>Hy Sir!</h1>
        </div>
    )
}
