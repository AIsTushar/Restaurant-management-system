import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log("url", url);
        const fetchData = async () => {
            setLoading(true);
            setError(false);

            try {
                const res = await axios.get(url);
                console.log("res", res);
                setData(res.data);
            } catch (error) {
                setError(true);
            }

            setLoading(false);
        };
        fetchData();
    }, [url]);

    const retFetch = async () => {
        setLoading(true);
        setError(false);

        try {
            const res = await axios.get(url);
            setData(res.data);
        } catch (error) {
            setError(true);
        }

        setLoading(false);
    };

    return { data, loading, error, retFetch };
};

export default useFetch;
