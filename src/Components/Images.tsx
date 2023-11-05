import React, { useState } from 'react'

// Import Interfaces
import { GalleryItem } from '../Interfaces'

// Import Reducers, Methods
import { useAppDispatch, useAppSelector } from '../Services/store'
import { setImages } from '../Services/Reducers/imageReducer'

// Import Components
import Checkbox from './Checkbox'
import Uploader from './Uploader'

const Images: React.FC = () => {
  // Get Data From Redux
  const images = useAppSelector(state => state?.image?.images ?? [])

  // States
  const dispatch = useAppDispatch()
  const [draggedItem, setDraggedItem] = useState<GalleryItem | null>(null)
 
  // Handle Drag Start
  const _handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: GalleryItem) => {
    setDraggedItem(item)
    e.dataTransfer.setData('text/plain', '') // Required for the drag-and-drop to work
  }
 
  // Handle Drag Over
  const _handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }
 
  // Handle Drop
  const _handleDrop = (e: React.DragEvent<HTMLDivElement>, targetItem: GalleryItem) => {
    e.preventDefault()

    if (draggedItem && draggedItem.id !== targetItem.id) {
      const newImages = [...images]
      const draggedIndex = images.findIndex((item: GalleryItem) => item.id === draggedItem.id)
      const targetIndex = images.findIndex((item: GalleryItem) => item.id === targetItem.id);
 
      // Swap the items
      [newImages[draggedIndex], newImages[targetIndex]] = [newImages[targetIndex], newImages[draggedIndex]]
     
      // Set 1st image always x 2
      if (targetIndex === 0) {
        newImages[targetIndex] = { ...newImages[targetIndex], isDoubleSize: true }
        newImages[draggedIndex] = { ...newImages[draggedIndex], isDoubleSize: false }
      } else if (draggedIndex === 0) {
        newImages[targetIndex] = { ...newImages[targetIndex], isDoubleSize: false }
        newImages[draggedIndex] = { ...newImages[draggedIndex], isDoubleSize: true }
      }
 
      dispatch(setImages(newImages))
    }
  }
 
  // Handle Mouse Enter
  const _handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, targetItem: GalleryItem) => {
    e.preventDefault()

    const newImages = [...images]
    const targetIndex = images.findIndex((item: GalleryItem) => item.id === targetItem.id)
 
    // Set Hover `true`
    newImages[targetIndex] = { ...newImages[targetIndex], hover: true }
    dispatch(setImages(newImages))
  }
 
  // Handle Mouse Leave
  const _handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>, targetItem: GalleryItem) => {
    e.preventDefault()
 
    const newImages = [...images]
    const targetIndex = images.findIndex((item: GalleryItem) => item.id === targetItem.id)
 
    // Set Hover `false`
    newImages[targetIndex] = { ...newImages[targetIndex], hover: false }
    dispatch(setImages(newImages))
  }
  return (
    <div className='gallery'>
      {images.map((item: GalleryItem) => (
        <div
          key={ item.id }
          className={ `item ${ item.isDoubleSize ? 'double-size' : '' }` }
          onDragStart={ (e) => _handleDragStart(e, item) }
          onDragOver={ (e) => _handleDragOver(e) }
          onDrop={ (e) => _handleDrop(e, item) }
          onMouseEnter={ (e) => _handleMouseEnter(e, item) }
          onMouseLeave={ (e) => _handleMouseLeave(e, item) }
          draggable
        >
          {/* Checkbox && !Selected */}
          <Checkbox image={ item } />

          {/* Image */}
          <img src={ item.imagePath } aria-hidden alt={ `Image ${ item.id }` } />
        </div>
      ))}

      {/* Upload Button */}
      <Uploader />
    </div>
  )
}

export default Images
