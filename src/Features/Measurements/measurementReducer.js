

const initialState = {
    selectedMetrics:[],
    metricData: [],
}

export const measurementReducer = (state = initialState, action) =>{

    switch(action.type) {
        case "SELECTED_METRIC" :
            return {...state, selectedMetrics: action.metrics}
        case "METRICS_RECEIVED":
            return {...state, metricData: action.payload}
           default:
               return state 
    }

}