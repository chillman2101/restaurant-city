function responseSuccess(response, total_data) {
    const message = "Response berhasil diterima";
    const data = response; 

    return {
        status:true,
        message: message,
        data: data,
        totalData: total_data
    };
}
function responseFailed(error) {
    const message = `Terjadi Kesalahan : ${error}`;

    return {
        status:false,
        message: message,
    };
}

export default {responseSuccess,responseFailed}

