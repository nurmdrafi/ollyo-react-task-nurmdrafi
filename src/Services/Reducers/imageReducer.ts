import { createSlice } from '@reduxjs/toolkit'

// Import Interfaces
import { ImageStates } from '../../Interfaces'

const initialState: ImageStates = {
  images: [],
  selectedImagesCount: 0
}

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    setImages: (state, action) => {
      state.images = action.payload
    },
    setSelectedImagesCount: (state, action) => {
      state.selectedImagesCount = action.payload
    }
  }
})

export const { setImages, setSelectedImagesCount } = imageSlice.actions
export default imageSlice.reducer
