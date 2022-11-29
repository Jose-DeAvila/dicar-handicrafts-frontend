import Cookies from "js-cookie";
import { BASE_URL } from "../../helpers";

const deleteAddress = async (object:any) => {
  const apiUrl = `${BASE_URL}/private/address/remove`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + Cookies.get("token"),
      },
      body: new URLSearchParams(object),
    });
    const data = await response.json();
    console.log(response.status)
    return {
      ...data,
      status: response.status,
    };
  } catch (error) {
    console.log(error);
  }
};
export default deleteAddress;
