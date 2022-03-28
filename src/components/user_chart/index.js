import React, { useContext, useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import UserContext from './../../context'
import dateFormat from "dateformat";
import './userChart.sass'

const UserChart = () => {
    const userData = useContext(UserContext)
    const [chartData, setChartData] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if(userData.userData?.measurements !== null && userData.userData?.measurements !== undefined) {
            setChartData(
                userData.userData.measurements.map(  item => { 
                    setLoading(false)
                    return {item , createdAt: dateFormat(item.createdAt, "mmmm dS, yyyy")}
                })
            )}
    },[userData])

    if(chartData !== null) {
        if(!loading) {
            return(
                <div className="user-chart-data">
                    <LineChart width={600} height={300} data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="item.weight" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey='createdAt' />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </div>
            )
        } else {
            return <h1>Loading...</h1>
        }
    } else {
        return (
            <div>
                <p>
                    Добави биологичните си данни за да започнеш да ги следиш!
                </p>
            </div>
        )
    }
}    


export default UserChart