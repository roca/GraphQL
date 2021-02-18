import React from 'react'
import { useRef, useState } from 'react';
import { Header, Image, Button } from 'semantic-ui-react'

function UploadImage() {
    const inputRef = useRef();
    const [image, setImage] = useState('https://react.semantic-ui.com/images/wireframe/image.png');

    function handleInputChange() {
        
    }
    
    return (
        <div>
            <Header as="h4">Upload your image</Header>
            <Image size="large" src={image} />
                <input ref={inputRef} type="file" onChange={handleInputChange} className='hide' />
                <Button onClick={() => inputRef.current.click()} className='mt-1'>Upload Image</Button>
        </div>
    );
}

export default UploadImage
