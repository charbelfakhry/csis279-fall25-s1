import React from 'react';

const Message = () => {
    
    const showMessage = () =>{
        return "Message container";
    }
    
    return (
        <>
            <h3 className='text-danger'>{showMessage()}</h3>
        </>
    )
}

export default Message;