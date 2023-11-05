import React, { useRef } from 'react'

// Import Icon
import uploadIcon from '../Assets/Icons/upload.png'
import demoImg from '../Assets/Images/image-11.jpeg'

// Import Reducers, Methods
import { useAppDispatch, useAppSelector } from '../Services/store'
import { setImages } from '../Services/Reducers/imageReducer'

const Uploader: React.FC = () => {
  // Get Data From Redux
  const images = useAppSelector(state => state?.image?.images ?? [])

  // States
  const dispatch = useAppDispatch()
  const uploadInputRef = useRef<HTMLInputElement | null>(null)

  // Handle Image Upload
  const _handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      const newImages = [...images]
      const newId = images.length + 1

      newImages.push({
        id: newId,
        imagePath: URL.createObjectURL(file),
        isDoubleSize: images.length === 0,
      })

      dispatch(setImages(newImages))

      // Reset the input field
      if (uploadInputRef.current) {
        uploadInputRef.current.value = ''
      }
    }
  }
  return (
    <>
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

      {/* Adjust Uploader Height */}
      <img className='hidden' src={ demoImg } aria-hidden alt='test' />
    </>
  )
}

export default Uploader
