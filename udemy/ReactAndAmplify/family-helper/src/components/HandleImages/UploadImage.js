import React from 'react'
import { useState } from 'react';
import { Image, Button } from 'semantic-ui-react'

function UploadImage() {
    const [image, setImage] = useState('https://react.semantic-ui.com/images/wireframe/image.png');

    function handleInputChange() {
        
    }
    
    return (
        <div>
            <Image size="large" src={image} />
                <input type="file" onChange={handleInputChange} />
                <Button>Upload Image</Button>
        </div>
    );
}

export default UploadImage
