function responseSuccess(response,message, total_data) {    
    const data = response; 

    return {
        status:true,
        message: message,
        data: data,
        totalData: total_data
    };
}
function responseFailed(error) {
    const message = error

    return {
        status:false,
        message: message,
    };
}

export default {responseSuccess,responseFailed}

