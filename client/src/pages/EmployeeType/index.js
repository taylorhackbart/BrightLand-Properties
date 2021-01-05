import React from "react";

function EmployeeType() {
  return (
    <>
      <form>
        <input type="radio" value="admin" name="employee" /> Admin
        <input type="radio" value="manager" name="employee" /> Manager
        <input type="radio" value="cleaner" name="employee" /> Cleaner
        <button > Add New Job </button>
        First Name (Primer Nombre):
        <input type="text" value="fname" />
        Last Name (El Apellido)
        <input type="text" value="lname" />
        Enter your Phone Number 
        <input type="text" value="phoneNumber" />
        Create a Username (Crear un Nombre de Usuario)
        <input type="text" value="username" />
        Create a Password (Crea una Contraseña)
        <input type="password" value="password" />
      </form>
    </>
  );
}
export default EmployeeType;
