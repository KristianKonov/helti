import React, { useContext, useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import UserContext from './../../context'
import dateFormat from "dateformat";
import './userChart.sass'

const UserChart = () => {
    const userData = useContext(UserContext)
    const [chartData, setChartData] = useState(null)
    const [sorted, setSorted] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if(userData.userData?.measurements !== null && userData.userData?.measurements !== undefined) {
            if(chartData === 1) {
                !Array.isArray(chartData) && setChartData([chartData])
                setChartData(
                    userData.userData.measurements.map(  item => { 
                        setLoading(false)
                        return {item , date: Date.parse(item.createdAt) , createdAt: (item.createdAt, "mmmm dS, yyyy")}
                    })
                )
            }
            setChartData(
                userData.userData.measurements.map(  item => { 
                    setLoading(false)
                    return {item , date: Date.parse(item.createdAt) , createdAt: dateFormat(item.createdAt, "mmmm dS, yyyy")}
                })
            )} 
    },[userData.userData])

    useEffect(() => {
        if(chartData !== null && chartData.length > 1) {
            setSorted(
                chartData.sort(function(date1,date2) {
                    var da = new Date(date1.date);
                    var db = new Date(date2.date);
                    if (da === db) {
                        return 0;
                    }
                    return da > db ? 1 : -1;
                })
            )
        }
        if(chartData !== null && chartData.length > 1) {
            setSorted(
                chartData
            )
        }
    },[chartData])

    if(sorted !== null && userData.userData.measurements.length > 0 ) {
        if(!loading) {
            var min = 2;
            var max = 98;
            if(sorted.length > 1) {
                sorted.map(item => {
                    if(max === 98 && min === 2) {
                        max = item.item.weight
                        min = item.item.weight
                    } else {
                        if(min > item.item.weight)
                            min = item.item.weight
                        if(max < item.item.weight)
                            max=item.item.weight
                    }
                })
            }
            return(
                <div className="user-chart-data">
                    <ResponsiveContainer width="100%" height='100%'>
                        <LineChart width={600} height={300} data={sorted} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <Line type="monotone" dataKey="item.weight" name='Тегло' stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <XAxis dataKey='createdAt' />
                            <YAxis domain={[min - 2, max + 2]} />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
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