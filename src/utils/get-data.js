import { useEffect, useState } from "preact/hooks";

function useGetData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Response not ok!");
      })
      .then((results) => {
        console.log(results)
        setData(results);
      })
      .catch((err) => {
        setError(err);
      });
  }, [url]);
  return { data, loading, setLoading, error,setError };
}

function getData(url) {
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Response not ok!");
    })
    .then((results) => {
      return results;
    })
    .catch((err) => {
      console.error("error while fetching :", url, err);
      throw err;
    });
}
export { getData };
export default useGetData;
