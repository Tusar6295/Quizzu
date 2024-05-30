import { useEffect, useState } from "react";

const useData = (fn,params=null) => {
    const [data, setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fn(params);
            setData(response);
        } catch (error) {
            Alert.alert(error.response.data.message);
        } finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [params])

    const refetch = () => fetchData()    
    return {data,isLoading,refetch}
}

export default useData;