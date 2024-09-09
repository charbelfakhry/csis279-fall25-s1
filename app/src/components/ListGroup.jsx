import React, { useState } from 'react';

const ListGroup = () => {

    const [selected, setSelected] = useState('');

    const fillData = () => {
        let arr = [];
        for (let i = 0; i < 100; i++) {
            arr.push(`item ${i}`);
        }
        return arr;
    }
    
    const clickHanlder = (event, item) => {
        setSelected(item);
    }


    return (
        <>
            <ul className="list-group">
                {
                    fillData().map((item, index)=>{
                        return(
                            <li 
                            key={index}className={(selected === item) ? "list-group-item active" : "list-group-item" } 
                            onClick={(event)=>clickHanlder(event, item)}>{item}
                           </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

export default ListGroup;