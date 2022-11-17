import Cookies from "js-cookie";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import styled from "styled-components";
import { CartList, Input, InputFull, ShopLayout } from "../../components";
import ContextAdress from "../../context/AddressContext";
import { EmptyObject } from "../../helpers";
import useAdress from "../../hooks/useAdress";
import useUser from "../../hooks/useUser";
import { IProduct } from "../../interfaces";

const Main = styled.div`
  width: 100%;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const UserInformation = styled.section`
  width: 65%;
`;
const TitleSection = styled.p`
  font-weight: bolder;
  color: #f6d1bc;
  font-size: 15px;
  margin-top: 30px;
  margin-bottom: 15px;
`;
const HalfInput = styled.div`
  width: 45%;
`;
const InLineInput = styled.div`
  width: 94%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ConfirmText = styled.p`
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
  width: 94%;
  text-align: right;
  padding-right: 10px;
  a {
    color: #606060;
    font-weight: 400;
    &:hover {
      font-weight: 600;
    }
  }
`;

const ConfirmaDatos: NextPage = () => {
  const { address, city, department } = useContext(ContextAdress);
  const { data } = useAdress();
  const {user} = useUser()
  const route = useRouter().push
  const { data: addresses } = data as any;

  let domicilio;
  let cityCampare;
  let departmentCompare

  if (address) {
    domicilio = address;
    cityCampare = city;
    departmentCompare = department
  }
  else if(addresses) {
    domicilio = addresses[0].address;
    cityCampare = addresses[0].city_name;
    departmentCompare = addresses[0].department_name
  } else {
    domicilio = "No hay direcciones disponibles";
    cityCampare = "No establecido";
    departmentCompare = "No establecido"
  }
  const Redirect = () =>{
    route("/")
  }

const value = JSON.parse(Cookies.get("FastBuy")|| "{}")

  return (
    <ShopLayout
      title="Confirma tus datos"
      descriptionPage="Verifica tus datos para comprar"
    >
      {
        EmptyObject(user) ? <p>Contenido no disponible</p> :<><h2>Verifica tus datos</h2>
        <Main>
          <UserInformation>
            <div>
              <TitleSection>Datos de usuario</TitleSection>
              <InputFull
                type="text"
                bradius="5px"
                fSize="15px"
                py="7px"
                label="Nombre completo"
                mb="10px"
                value={`${user.firstname} ${user.lastname}`}
              />
              <InputFull
                type="email"
                bradius="5px"
                fSize="15px"
                py="7px"
                label="Email"
                mb="10px"
                value={user.email}
              />
              <HalfInput>
                <InputFull
                  type="number"
                  bradius="5px"
                  fSize="15px"
                  py="7px"
                  label="Celular"
                  mb="10px"
                  value={user.phone_number}
                />
              </HalfInput>
            </div>
            <div>
              <TitleSection>Datos de envío</TitleSection>
              <InputFull
                type="text"
                bradius="5px"
                fSize="15px"
                py="7px"
                label="Dirección"
                mb="10px"
                value={domicilio}
              />
              <ConfirmText>
                <Link href="/direccion/selecciona-domicilio">
                  Editar o registrar un dirección
                </Link>
              </ConfirmText>
              <InLineInput>
                <HalfInput>
                  <InputFull
                    type="text"
                    bradius="5px"
                    fSize="15px"
                    py="7px"
                    label="Ciudad"
                    mb="12px"
                    value={cityCampare}
                  />
                </HalfInput>
                <HalfInput>
                  <InputFull
                    type="text"
                    bradius="5px"
                    fSize="15px"
                    py="7px"
                    label="Departamento"
                    mb="12px"
                    value={departmentCompare}
                  />
                </HalfInput>
              </InLineInput>
              <Input
                 type="text"
                 label="Punto de referencia"
                 placeholder="Ingrese guía"
                 bradius="5px"
                 fSize="15px"
                 py="7px"
                 mb="10px"
                 name="reference"
              />
            </div>
          </UserInformation>
  
          <CartList mode="summary" array={value}/>
        </Main></>
      }
    </ShopLayout>
  );
};
export default ConfirmaDatos;