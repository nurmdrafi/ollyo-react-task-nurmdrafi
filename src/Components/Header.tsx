/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react'

// Import Reducers, Methods
import { useAppDispatch, useAppSelector } from '../Services/store'

// Import Interfaces
import { GalleryItem } from '../Interfaces'
import { setImages, setSelectedImagesCount } from '../Services/Reducers/imageReducer'

const Header: React.FC = () => {
  // Get Data From Redux
  const images = useAppSelector(state => state?.image?.images ?? [])
  const selectedImagesCount = useAppSelector(state => state?.image?.selectedImagesCount ?? 0)

  // States
  const dispatch = useAppDispatch()
  const isChecked = true

  // Handle Delete Images
  const _handleDeleteImages = (): void => {
    const newImages = images.filter((item: GalleryItem) => !item.selected)

    if (newImages.length === 0) {
      dispatch(setImages([]))
    } else {
      newImages[0] = { ...newImages[0], isDoubleSize: true }
    }
    dispatch(setImages(newImages))
  }

  // On Change Images Set Selected Images Count
  useEffect(() => {
    let count = 0
    images.forEach((image: GalleryItem) => {
      if (image.selected) {
        count += 1
      }
    })
    dispatch(setSelectedImagesCount(count))
  }, [dispatch, images])

  return (
    <div className='header'>
      {/* Text + Checkbox + Image Count  */}
      {selectedImagesCount ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <label className='checkbox-label'>
            <input
              type='checkbox'
              checked={ isChecked }
            />
          </label>
          <h2 style={{ marginLeft: '5px' }}>{ selectedImagesCount } File{selectedImagesCount === 1 ? '' : 's'} Selected</h2>
        </div>
      ) : (
        <h2>Gallery</h2>
      )}

      {/* Delete Button */}
      {selectedImagesCount ? (
        <button type='button' onClick={ _handleDeleteImages }>Delete file</button>
      ) : (<></>)}
    </div>
  )
}

export default Header
