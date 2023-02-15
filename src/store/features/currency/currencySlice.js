import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoaded: false,
  rateList: [],
  currencyList: [],
  actions: ["Buy", "Sell"],
  selectedAction: "Buy",
  selectedCurrency: ""
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    addRateList: (state, action) => {
        state.isLoaded = true
        state.rateList = action.payload

    },
    addCurrencyList: (state, action) => {
        state.currencyList = action.payload
    },
    updateAction: (state, action) => {
      state.selectedAction = action.payload
    },
    updateSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload
    }
  },
})

export const { addRateList, addCurrencyList, updateAction, updateSelectedCurrency } = currencySlice.actions

export default currencySlice.reducer