import { createSlice } from '@reduxjs/toolkit'

// Interface
interface ImageStates {
  images: any
}

const initialState: ImageStates = {
  images: []
}

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    // 
  }
})

export default imageSlice.reducer
