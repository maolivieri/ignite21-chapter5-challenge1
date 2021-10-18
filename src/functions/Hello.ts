export const handle = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "HELLOW@!!!!"
        }),
        headers: {
            "content-type": "application/json"
        }
    }
}