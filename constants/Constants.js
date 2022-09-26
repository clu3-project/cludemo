const prod = {
    url: {
        API_URL: 'https://clu3-service.herokuapp.com/',
    }
}

const dev = {
    url : {
        API_URL: 'http://localhost:8080/',
    }
}

export const config = process.env.NODE_ENV === "development" ? dev : prod;