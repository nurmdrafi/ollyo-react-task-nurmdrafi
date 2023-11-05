/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react'

// Import Icon
import uploadIcon from '../Assets/Icons/upload.png'
import demoImg from '../Assets/Images/image-11.jpeg'

// Interface
interface GalleryItem {
  id: number;
  imagePath: string;
  isDoubleSize: boolean;
  hover?: boolean
  selected?: boolean
}

const Gallery: React.FC = () => {
  // States
  const [images, setImages] = useState<GalleryItem[]>([])
  const [draggedItem, setDraggedItem] = useState<GalleryItem | null>(null)
  const uploadInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedImagesCount, setSelectedImagesCount] = useState<number>(0)

  // Handle Drag Start
  const _handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: GalleryItem) => {
    setDraggedItem(item)
    e.dataTransfer.setData('text/plain', '') // Required for the drag-and-drop to work
  }

  // Handle Drag Over
  const _handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  //   const _handleDragEnter = () => {
  //     // item: GalleryItem
  //   }

  //   const _handleDragLeave = () => {
  //     // item: GalleryItem
  //   }

  // Handle Drop
  const _handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItem: GalleryItem) => {
    e.preventDefault()
    if (draggedItem && draggedItem.id !== targetItem.id) {
      const newImages = [...images]
      const draggedIndex = images.findIndex((item) => item.id === draggedItem.id)
      const targetIndex = images.findIndex((item) => item.id === targetItem.id);

      // Swap the items
      [newImages[draggedIndex], newImages[targetIndex]] = [newImages[targetIndex], newImages[draggedIndex]]
    
      // Set 1st image always x 2
      if (targetIndex === 0) {
        newImages[targetIndex].isDoubleSize = true
        newImages[draggedIndex].isDoubleSize = false
      } else if (draggedIndex === 0) {
        newImages[targetIndex].isDoubleSize = false
        newImages[draggedIndex].isDoubleSize = true
      }
      setImages(newImages)
    }
  }

  // Handle Mouse Enter
  const _handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, targetItem: GalleryItem) => {
    e.preventDefault()
    const newItems = [...images]
    const targetIndex = images.findIndex((item) => item.id === targetItem.id)

    // Set Hover `true`
    newItems[targetIndex].hover = true
    setImages(newItems)
  }

  // Handle Mouse Leave
  const _handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>, targetItem: GalleryItem) => {
    e.preventDefault()

    const newItems = [...images]
    const targetIndex = images.findIndex((item) => item.id === targetItem.id)

    // Set Hover `false`
    newItems[targetIndex].hover = false
    setImages(newItems)
  }

  // Handle Check Box Change
  const _handleCheckboxChange = (targetItem: GalleryItem) => {
    const newItems = [...images]
    const targetIndex = images.findIndex((item) => item.id === targetItem.id)
    newItems[targetIndex].selected = !newItems[targetIndex].selected
    setImages(newItems)
  }

  // Handle Image Upload
  const _handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      const newItems = [...images]
      const newId = images.length + 1

      newItems.push({
        id: newId,
        imagePath: URL.createObjectURL(file),
        isDoubleSize: images.length === 0,
      })

      setImages(newItems)

      // Reset the input field
      if (uploadInputRef.current) {
        uploadInputRef.current.value = ''
      }
    }
  }
  
  // Handle Delete Images
  const _handleDeleteImages = (): void => {
    const newItems = images.filter((image) => !image.selected)
    newItems[0].isDoubleSize = true
    setImages(newItems)
  }
  
  // On Change Images Set Selected Images Count
  useEffect(() => {
    let count = 0
    images.forEach((image: GalleryItem) => {
      if (image.selected) {
        count += 1
      }
    })
    setSelectedImagesCount(count)
  }, [images])
  return (
    <>
      <div className='header'>
        {/* Text + Checkbox + Image Count  */}
        {selectedImagesCount ? (
          <h2>{ selectedImagesCount } File{selectedImagesCount === 1 ? '' : 's'} Selected</h2>
        ) : (
          <h2>Gallery</h2>
        )}

        {/* Delete Button */}
        {selectedImagesCount ? (
          <button type='button' onClick={ _handleDeleteImages }>Delete file</button>
        ) : (<></>)}
      </div>
      <div className='gallery'>
        {images.map((item) => (
          <div
            key={ item.id }
            className={ `item ${ item.isDoubleSize ? 'double-size' : '' }` }
            onDragStart={ (e) => _handleDragStart(e, item) }
            onDragOver={ _handleDragOver }
            //   onDragEnter={ () => _handleDragEnter() }
            //   onDragLeave={ () => _handleDragLeave() }
            onDrop={ (e) => _handleDrop(e, item) }
            draggable
            onMouseEnter={ (e) => _handleMouseEnter(e, item) }
            onMouseLeave={ (e) => _handleMouseLeave(e, item) }
          
          >
            {/* Checkbox && !Selected */}
            {item.hover && (
              <div className='overlay dark-overlay'>
                <label className='checkbox-label'>
                  <input
                    type='checkbox'
                    checked={ item.selected }
                    onChange={ () => _handleCheckboxChange(item) }
                  />
                </label>
              </div>            
            )}

            {/* Checkbox && Selected */}
            {item.selected && (
              <div className='overlay white-overlay'>
                <label className='checkbox-label'>
                  <input
                    type='checkbox'
                    checked={ item.selected }
                    onChange={ () => _handleCheckboxChange(item) }
                  />
                </label>
              </div>
            )}

            {/* Image */}
            <img src={ item.imagePath } aria-hidden alt={ `Image ${ item.id }` } />
          </div>
        ))}

        {/* Image Upload Button */}
        <div className='item upload-button'>
          <label htmlFor='fileInput' className='upload-label'>
            <input
              type='file'
              accept='image/*'
              id='fileInput'
              ref={ uploadInputRef }
              onChange={ _handleImageUpload }
            />
            <img src={ uploadIcon } aria-hidden alt='upload-icon' />
            <h4>Add Images</h4>
          </label>
        </div>
      
        {/* For Adjust Upload Button Height */}
        <img className='hidden' src={ demoImg } aria-hidden alt='test' />
      </div>
    </>
  )
}

export default Gallery
