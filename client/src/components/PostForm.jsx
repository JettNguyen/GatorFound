// src/components/PostForm.jsx
import React, { useState } from 'react';
import './PostForm.css';

const PostForm = ({ postType, handleSubmit }) => {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemLocation, setItemLocation] = useState('');
    const [itemPhoto, setItemPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setItemPhoto(file);
            setPhotoPreview(URL.createObjectURL(file)); // Create a preview URL
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            itemName,
            itemDescription,
            itemLocation,
            postType,
            itemPhoto: photoPreview // Save the photo preview URL in the post data
        };

        // Call the parent function to add the post to the correct category
        handleSubmit(newPost);

        // Clear the form
        setItemName('');
        setItemDescription('');
        setItemLocation('');
        setItemPhoto(null);
        setPhotoPreview(null);
    };

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
