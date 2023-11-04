import React, { useState, useRef } from 'react'

interface GalleryItem {
  id: number;
  imagePath: string;
  isDoubleSize: boolean;
}

const Gallery: React.FC = () => {
  // States
  const [images, setImages] = useState<GalleryItem[]>([])
  const [draggedItem, setDraggedItem] = useState<GalleryItem | null>(null)
  const uploadInputRef = useRef<HTMLInputElement | null>(null)

  const _handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: GalleryItem) => {
    setDraggedItem(item)
    e.dataTransfer.setData('text/plain', '') // Required for the drag-and-drop to work
  }

  const _handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  //   const _handleDragEnter = () => {
  //     // item: GalleryItem
  //   }

  //   const _handleDragLeave = () => {
  //     // item: GalleryItem
  //   }

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

  const _handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <div className="gallery">
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
        >
          <img src={ item.imagePath } aria-hidden alt={ `Image ${ item.id }` } />
        </div>
      ))}

      <div className="item">
        <input
          type="file"
          accept="image/*"
          ref={ uploadInputRef }
          onChange={ _handleUpload }
        />
      </div>
    </div>
  )
}

export default Gallery
