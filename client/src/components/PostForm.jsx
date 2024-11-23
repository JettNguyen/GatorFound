// src/components/PostForm.jsx
import React, { useState, useEffect } from 'react';
import './PostForm.css';

const PostForm = ({ postType, handleSubmit, setUserPosts }) => {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemLocation, setItemLocation] = useState('');
    
    const [itemPhoto, setItemPhoto] = useState('');
    const [photoPreview, setPhotoPreview] = useState(null);

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setItemPhoto(file);
            setPhotoPreview(URL.createObjectURL(file)); // Create a preview URL
        }
    };

    const onSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('itemName', itemName);
        formData.append('itemDescription', itemDescription);
        formData.append('postType', postType);
        formData.append('itemLocation', itemLocation);
        if (itemPhoto){
            formData.append('itemPhoto', itemPhoto);
        }
        try{
            const response = await fetch('http://localhost:5000/GatorFound/items', {
                method: 'POST',
                
                headers: {
                    //'Content-type': 'application/json',
                    'auth-token': `${sessionStorage.getItem('token')}`,
                },
                body: formData,
            });
            const data = await response.json();
            if (!response.ok){
                throw new Error(data.message || 'Error!, please submit all information!');
            }
            else{
                //alert({});
                // Call the parent function to add the post to the correct category
                handleSubmit(data);
                alert("Create new item post successfully!")

                // Clear the form
                setItemName('');
                setItemDescription('');
                setItemLocation('');
                setItemPhoto(null);
                setPhotoPreview(null);
            }
            
        } catch (error){
            console.error('Error during login:', error);
            alert(error.message);
        }         
    };
    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:5000/GatorFound/items');
            const data = await response.json();
            setUserPosts(data.data); // Update state with the fetched posts
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };
    useEffect(() => {
        fetchPosts(); // Initial fetch when the component mounts
    }, []);
    
    return (
        <form className={`post-form ${postType}`} onSubmit={onSubmit}>
            <h3>{postType === 'lost' ? 'Report Lost Item' : 'Report Found Item'}</h3>
            <input
                type="text"
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
            />
            <textarea
                placeholder="Item Description (optional)"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="Item Location (optional)"
                value={itemLocation}
                onChange={(e) => setItemLocation(e.target.value)}
            />
            <label htmlFor="item-photo">Upload photo (optional):</label>
            <input
                type="file"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handlePhotoUpload}
            />
            {photoPreview && (
                <div className="photo-preview">
                    <img src={photoPreview} alt="Uploaded Preview" />
                </div>
            )}
            <button type="submit">Submit</button>
        </form>
    );
};

export default PostForm;
