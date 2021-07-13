import React, { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = () => {
    axios.put(
      "https://full-stack-api-lcds97.herokuapp.com/users/changepassword",
      { oldPassword: oldPassword, newPassword: newPassword },
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
    ).then((response) => {
        if (response.data.error){
            alert(response.data.error);
        }
    });
  };

  return (
    <div>
      <h1>Muda sua senha:</h1>
      <input
        type="text"
        placeholder="Antiga senha"
        onChange={(event) => setOldPassword(event.target.value)}
      />
      <input
        type="text"
        placeholder="Nova senha"
        onChange={(event) => setNewPassword(event.target.value)}
      />
      <button onClick={changePassword}> Salvar mudanças</button>
    </div>
  );
}

export default ChangePassword;
