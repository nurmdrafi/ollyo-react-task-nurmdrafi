/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'

// Import Interfaces
import { GalleryItem, CheckboxProps } from '../Interfaces'

// Import Reducers, Methods
import { useAppDispatch, useAppSelector } from '../Services/store'
import { setImages } from '../Services/Reducers/imageReducer'

const Checkbox: React.FC<CheckboxProps> = ({ image }) => {
  // Get Data From Redux
  const images = useAppSelector(state => state?.image?.images ?? [])

  // States
  const dispatch = useAppDispatch()

  // Handle Checkbox Change
  const _handleCheckboxChange = (targetItem: GalleryItem) => {
    const newImages = [...images]
    const targetIndex = images.findIndex((item: GalleryItem) => item.id === targetItem.id)
    newImages[targetIndex] = { ...newImages[targetIndex], selected: !newImages[targetIndex].selected }
    dispatch(setImages(newImages))
  }

  return (
    <div>
      {/* Checkbox && !Selected */}
      {image.hover && (
        <div className='overlay dark-overlay'>
          <label className='checkbox-label'>
            <input
              type='checkbox'
              checked={ image.selected }
              onChange={ () => _handleCheckboxChange(image) }
            />
          </label>
        </div>
      )}
  
      {/* Checkbox && Selected */}
      {image.selected && (
        <div className='overlay white-overlay'>
          <label className='checkbox-label'>
            <input
              type='checkbox'
              checked={ image.selected }
              onChange={ () => _handleCheckboxChange(image) }
            />
          </label>
        </div>
      )}
    </div>
  )
}

export default Checkbox
