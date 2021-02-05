import React from 'react';

function Lists({lists}) {
    return (
        <div>
            {lists.map(item =>  <li key={item.id} >{item.title}</li> )} 
        </div>
    )
}

export default Lists
