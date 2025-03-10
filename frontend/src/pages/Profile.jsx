import React from "react";
import AuthService from "../services/auth.service";

function Profile() {
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser);

  return (
    <div className="App">
      <h1>Perfil</h1>
      <div>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </div>
      <div>
        <strong>Id:</strong> {currentUser.id_usuario}
      </div>
      <div>
        <strong>Nombre:</strong> {currentUser.nombre_usuario}
      </div>
      <div>
        <strong>Email:</strong> {currentUser.correo}
      </div>
      <div>
        <strong>Rol:</strong> {currentUser.rol}
      </div>
    </div>
  );
}

export default Profile;
