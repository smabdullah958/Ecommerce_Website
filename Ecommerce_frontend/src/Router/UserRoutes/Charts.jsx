import { useEffect, useState } from "react"
import axios from "axios"
import { 
    LineChart,Line ,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer } from "recharts";
import {format,subDays} from "date-fns";
function Charts(){
    let [ChartData,SetChartData]= useState([]);

    useEffect(()=>{
        let  fetchSalesData = async ()=>{
                try{
                        let response=await axios.get("http://localhost:5555/UploadItem/Monthly_Sales")
                
                        let order=response.data.result;

                        //collect the items base of 15 days
                        //or        
                        // Step 1: Generate past 15 days with default 0 sales
                let Daily_Sales = {};
                for (let i = 14; i >= 0; i--) {
                    let day = format(subDays(new Date(), i), "d MMM"); 
                    Daily_Sales[day] = 0;  // default 0 sales
                }


                        order.forEach((order)=>{
          
                            let day=format(
                                new Date(order.createdAt),"d MMM"       //formed date like 15 june 16 june
                            );
                                // Check if this day exists in my last 15-day ”
                                //      If yes → update daily sales
                                //     If no → ignore (older data)
                            if(Daily_Sales[day]!==undefined){
                            Daily_Sales[day]+=order.Quantity;
                            }
                        })
                            //now convert to arrray for a charts
                            let formattedData=Object.entries(Daily_Sales).map(([day,quantity])=>({
                            day,
                            quantity
                        }));
                        SetChartData(formattedData);
                    }
        catch(error){
            console.log("error is charts : ",error)
        }
            }
            fetchSalesData();
    },[]);
    return (
        <div className="bg-gradient-to-tr from-gray-200 to-slate-100  h-screen">
<div className="w-full  h-[400px] p-4 ">
<h2 className="text-xl font-semibold mb-2">📊 Sales of Past 15 days</h2>
<ResponsiveContainer width="100%" height="100%">

<LineChart data={ChartData}>
        
        <XAxis dataKey="day"/>
    
        <YAxis/>
        <Tooltip/>
        <CartesianGrid stroke="#ccc"/>
        <Line type="monotone" dataKey="quantity" stroke="#82ca9d" strokeWidth={2}/>
</LineChart>

</ResponsiveContainer>
    

</div>
</div>

    )
}
export default  Charts