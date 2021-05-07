import React, {useState, useEffect} from 'react'
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux'
import Select from 'react-select'
import {MetricsQuery} from '../graphQLQueries/index'
import './selectmetrics.css'

const SelectMetric = () => {

    const [metrics, setMetrics] = useState()

    const { loading, error, data } = useQuery(MetricsQuery)

    const dispatch = useDispatch()

    useEffect(() => {

        if(metrics){
        dispatch({type: "SELECTED_METRIC", metrics})
        
        }

    },[ metrics, dispatch])
    if (loading) return <p>Loading... </p>
    if (error) return <p> ${error.message}</p>

    const transformData = data && data.getMetrics.map(eachMetric => ({value: eachMetric, label: eachMetric}))

    return (

        <div style={{display: 'flex',justifyContent: 'center', marginTop: '2rem'}}>
          <Select isMulti options={transformData} className="fixSelectWidth" value={metrics} onChange={(e) => setMetrics(e)} />  
        </div>
    )
}

export default SelectMetric
