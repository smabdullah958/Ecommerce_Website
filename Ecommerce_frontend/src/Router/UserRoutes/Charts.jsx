import { useEffect, useState } from "react"
import axios from "axios"
import { 
    LineChart,Line ,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer } from "recharts";
import {format} from "date-fns";
function Charts(){
    let [ChartData,SetChartData]= useState([]);

    useEffect(()=>{
        let  fetchSalesData = async ()=>{
                try{
                        let response=await axios.get("http://localhost:5555/UploadItem/Monthly_Sales")
                
                        let order=response.data.result;

                        //collect the items base of 15 days
                        let Daily_Sales={};

                        order.forEach((order)=>{
          
                            let day=format(
                                new Date(order.createdAt),"d MMM"       //formed date like 15 june 16 june
                            );
                            //aghr din mai ek be sale na ho to sale 0 kr do
                            if(!Daily_Sales[day]){
                                Daily_Sales[day]=0;
                            }
                            Daily_Sales[day]+=order.Quantity;
                        
                        })
                            //now convert to arrray
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