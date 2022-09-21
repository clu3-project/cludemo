const clu3 = async (token, url, address) => {
    
    if (!token) {
        return {
            "type": 'error',
            "message": 'Please complete the captcha'
        };
    }

    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            'Access-Control-Allow-Headers': "Content-Type, Authorization",
        },
        body: JSON.stringify({
            token,
            senderAddress: address,
        }),

    };
    const myResponse =  fetch(url, options)
    .then((result) => result.json()).then(data =>{
        return data;
    });
 
    return myResponse;
};

export default clu3;