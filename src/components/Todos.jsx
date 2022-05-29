import React, { useEffect } from "react";
import axios from 'axios';
const Todos = () => {
    const [newtodo, setNewTodo] = React.useState("");
    const [todos, setTodos] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [totalCount, setTotalCount] = React.useState(0);

    const saveInfo = () => {

        fetch("http://localhost:3000/todos",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    title: newtodo,
                    isCompleted: false,
                })
            })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                setTodos([...todos, data]);
                setNewTodo("");
            });
    };
    useEffect(() => {
        axios.get(`http://localhost:3000/todos?_page=${page}&_limit=4`)
            .then((r) => { setTodos(r.data);
                console.log(r); 
             setTotalCount(Number(r.headers["x-total-count"]));
        });
    }, [page]);

    const handleRemove = (id) => {
        let newT = todos.filter(el => el.id !== id);
        setTodos(newT);
    }
    return (
        <div>
            <div>
                <input value={newtodo} onChange={({ target }) => setNewTodo(target.value)} />
                <button onClick={saveInfo}>ADD</button>
            </div>
            <div>
                {todos.map((todo) => (

                    <div key={todo.id}>
                        <div>{todo.title}
                            <button onClick={() => { handleRemove(todo.id) }}>Delete</button></div>
                    </div>
                ))}
                <div>
                    <button disabled={page <= 1} onClick={() => { setPage(page - 1) }}>Prev</button>
                    <button  disabled={totalCount < page *5} onClick={() => { setPage(page + 1) }}>Next</button>
                </div>
            </div>
        </div>

    )

}
export default Todos;