import axios from "axios";
const BASE_URL ="http://localhost:4000"

export default function ajax(url = "", data = {}, type = "GET") {
  if (type === "GET") {
    // data: {username: xxx, userPW: xxx}
    // dataStr: username=xxx&userPW=xxx
    let dataStr = "";
    Object.keys(data).forEach((key) => {
      dataStr += key + "=" + data[key] + "&";
    });

    if (dataStr !== "") {
      dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
      url = url + "?" + dataStr;
    }
    return axios.get(url);
  } else {
    return axios.post(url, data);
  }
}
