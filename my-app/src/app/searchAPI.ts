// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export const fetchResults = async (filter = "", center= {lat:47.6062,lng:-122.3321}) => {
  const { lng, lat } = center;
  
  const data = await fetch(`http://localhost:3333/api/v1/places?lng=${lng}&lat=${lat}&keyword=${filter}`).then((response)=>{
    return response.json()}).catch((error)=>{console.log(error.toString())})
  return (data||[]);
}
