"use client"
import React, { useEffect, useState } from 'react'

const page = () => {
    const [count, setCount] = useState(1)
    useEffect(() => {
        console.log("use effect running")
    }, [])
    useEffect(() => {
        console.log("count changed")
    }, [count])
    return (
        <div>
            {count}
            <button onClick={() => setCount(count + 1)}>click</button></div>
    )
}

export default page