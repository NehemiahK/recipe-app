
export const post = (url,data) => {
    return fetch(url,{
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache': 'no-cache' 
          },
        credentials: 'same-origin',
        body: JSON.stringify(data)
      })
}   

export const put = (url,data) => {
    return fetch(url,{
        method: "PUT",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Cache': 'no-cache' 
          },
        credentials: 'same-origin',
        body: JSON.stringify(data)
      })
}   

export const deleteByUrl = (url) => {
    return fetch(url, {
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
      },
      method: "DELETE",
  })
}

export const get = (url, searchParams={}) => {

    let searchKeys = Object.keys(searchParams)

    if(searchKeys.length > 0){
        url = `${url}?`
        searchKeys.forEach((key,indx) => {
          url += `${key}=${searchParams[key]}`
          if(indx !== searchKeys.length -1) {
            url += '&'
          }
        })
    }

    return fetch(url)
}