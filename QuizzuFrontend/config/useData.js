import { useEffect, useState } from "react";

const useData = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fn();
                setData(response);
            } catch (error) {
                Alert.alert(error.response.data.message);
            } finally{
                setIsLoading(false);
            }
        }
        fetchData();
    }, [])

    return {data}
}

export default useData;