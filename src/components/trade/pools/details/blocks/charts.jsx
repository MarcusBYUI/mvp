import { useState } from "react";
import styles from "./blocks.module.css"
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const Charts = () => {
    const [state, setState] = useState("seven")

    const monthlyData = [
        { name: 'Jan', value: 300 },
        { name: 'Feb', value: 762 },
        { name: 'Mar', value: 784 },
        { name: 'Apr', value: 433 },
        { name: 'May', value: 638 },
        { name: 'Jun', value: 800 },
        { name: 'Jul', value: 619 },
        { name: 'Aug', value: 400 },
        { name: 'Sep', value: 332 },
        { name: 'Oct', value: 797 },
        { name: 'Nov', value: 791 },
        { name: 'Dec', value: 660 },
        { name: 'Jan', value: 958 },
        { name: 'Feb', value: 647 },
        { name: 'Mar', value: 841 },
        { name: 'Apr', value: 553 },
        { name: 'May', value: 454 },
        { name: 'Jun', value: 696 },
        { name: 'Jul', value: 695 },
        { name: 'Aug', value: 673 },
        { name: 'Sep', value: 906 },
        { name: 'Oct', value: 616 },
        { name: 'Nov', value: 760 },
        { name: 'Dec', value: 948 },
        { name: 'Jan', value: 973 },
        { name: 'Feb', value: 895 },
        { name: 'Mar', value: 594 },
        { name: 'Apr', value: 625 },
        { name: 'May', value: 429 },
        { name: 'Jun', value: 437 }
    ];

    const dailyData = [
        { name: '01 Oct', value: 818 },
        { name: '02 Oct', value: 748 },
        { name: '03 Oct', value: 932 },
        { name: '04 Oct', value: 554 },
        { name: '05 Oct', value: 256 },
        { name: '06 Oct', value: 551 },
        { name: '07 Oct', value: 538 },
        { name: '08 Oct', value: 214 },
        { name: '09 Oct', value: 664 },
        { name: '10 Oct', value: 613 },
        { name: '11 Oct', value: 229 },
        { name: '12 Oct', value: 482 },
        { name: '13 Oct', value: 957 },
        { name: '14 Oct', value: 848 },
        { name: '15 Oct', value: 375 },
        { name: '16 Oct', value: 968 },
        { name: '17 Oct', value: 771 },
        { name: '18 Oct', value: 329 },
        { name: '19 Oct', value: 646 },
        { name: '20 Oct', value: 634 },
        { name: '21 Oct', value: 292 },
        { name: '22 Oct', value: 274 },
        { name: '23 Oct', value: 917 },
        { name: '24 Oct', value: 222 },
        { name: '25 Oct', value: 560 },
        { name: '26 Oct', value: 436 },
        { name: '27 Oct', value: 296 },
        { name: '28 Oct', value: 862 },
        { name: '29 Oct', value: 208 },
        { name: '30 Oct', value: 840 }
    ];

    const [data, setData] = useState(dailyData.slice(0, 7))

    return (
        <div className={styles.chart}>
            <p>Chart</p>
            <ResponsiveContainer width="105%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#7B3FE4" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#2512F3" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip formatter={(value) => [`$${value}`]} />
                <Area type="monotone" dataKey="value" stroke="#12AAFF" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
        </ResponsiveContainer>
        <div className={styles.controls}>
            <button onClick={()=>{setState("seven"); setData(dailyData.slice(0, 7))}} className={state == "seven" ? styles.active : ""}>7 Days</button>
            <button onClick={()=>{setState("daily"); setData(dailyData)}} className={state == "daily" ? styles.active : ""}>Daily</button>
            <button onClick={()=>{setState("monthly"); setData(monthlyData)}} className={state == "monthly" ? styles.active : ""}>Monthly</button>
        </div>
        </div>
    );
}


export default Charts;
