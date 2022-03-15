import React, {useState} from 'react'

function Dashboard(){
    const formDivStyle = {
        margin: "auto",
        padding: "20px",
        width: "80%"
    }
    return(
        <div style={formDivStyle}>
            <h1>DASHBOARD</h1>
            <div className='map-container'>
                <p>map here</p>
            </div>
        </div>
    )
}

export default Dashboard