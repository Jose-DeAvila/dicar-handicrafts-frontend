import { FC, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Cookies from "js-cookie";
import { NavLateralProps } from "../../../interfaces";
import useUser from "../../../hooks/useUser";
import { Input, Icon, Logo, Button } from "../../../components";
import { EmptyObject } from "../../../helpers";

const AsideMenu = styled.aside<{
  transform: string;
  height: string;
  mg: string;
  pt: string;
}>`
  background-color: ${({ theme }) => theme.background};
  width: 260px;
  height: ${(props) => props.height};
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: hidden;
  margin-top: ${(props) => props.mg};
  transition: 0.5s ease transform;
  z-index: 3;
  box-shadow: ${({ theme }) => theme.bshadow};
  transform: ${(props) => props.transform};
  padding: 25px 35px;
  padding-top: ${(props) => props.pt};

  figure {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
const Close = styled.span<{ display: string }>`
  width: 100%;
  margin-bottom: 25px;
  display: ${(props) => props.display};
  display: flex;
  justify-content: flex-end;
`;
const Form = styled.form<{ display: string }>`
  padding-bottom: 25px;
  border-bottom: 1px solid #e8e8e8;
  display: ${(props) => props.display};
`;
const ListItem = styled.li<{ color?: string }>`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:first-of-type {
    margin-top: 25px;
  }
  &:last-of-type {
    margin-bottom: 0px;
    padding-bottom: 25px;
    border-bottom: 1px solid #e8e8e8;
  }
  p {
    width: 88%;
    display: flex;
    justify-content: flex-start;
    color: ${(props) => props.color || ""};

    &:hover {
      font-weight: bolder;
    }
  }
`;

const NavLateral: FC<NavLateralProps> = ({
  transform,
  display_items,
  height,
  mg,
  pt,
  setIsOpen,
  logo = false,
}) => {
  const { user } = useUser();

  const handleClick = () => {
    localStorage.removeItem("userAuth");
    Cookies.remove("token");
    window.location.reload();
  };

  return (
    <AsideMenu
      transform={transform}
      height={height || "calc(100vh - 65px)"}
      mg={mg || "68px"}
      pt={pt || "0px"}
    >
      <Close
        onClick={() => setIsOpen(false)}
        display={display_items || "block"}
      >
        <Icon fill="fa-solid fa-xmark" />
      </Close>
      {logo ? (
        <figure>
          <Logo route="/" />
        </figure>
      ) : (
        <></>
      )}
      <Form display={display_items || "block"}>
        <Input
          type="text"
          placeholder="Busque un producto aquí"
          name="search"
          bradius="5px"
          fSize="14px"
        />
      </Form>
      {user.rol_id === 4 || EmptyObject(user) ? (
        <></>
      ) : (
        <>
          <ul>
            <ListItem color="lightgreen">
              <p>--- Admin ---</p>
            </ListItem>
            <Link href="/admin/home">
              <ListItem>
                <Icon fill="fa-solid fa-crown" margin="0" />
                <p>Agregar productos</p>
              </ListItem>
            </Link>
          </ul>
        </>
      )}
      <ul>
        <Link href="/productos/mochilas">
          <ListItem>
            <Icon fill="fa-solid fa-bag-shopping" margin="0px" />
            <p>Mochilas</p>
          </ListItem>
        </Link>
        <Link href="/productos/sandalias">
          <ListItem>
            <Icon fill="fa-solid fa-shoe-prints" margin="0px"></Icon>
            <p>Sandalias</p>
          </ListItem>
        </Link>
        <Link href="/productos/sombreros">
          <ListItem>
            <Icon fill="fa-brands fa-redhat" margin="0px" />
            <p>Sombreros</p>
          </ListItem>
        </Link>
        <Link href="/productos/accesorios">
          <ListItem>
            <Icon fill="fa-solid fa-burst" margin="0px" />
            <p>Accesorios</p>
          </ListItem>
        </Link>
      </ul>

      {EmptyObject(user) ? (
        <>
          <Link href="/auth/login">
            <div>
              <Button
                text="Iniciar sesión"
                bg="#f6d1bc"
                hover="rgba(246, 209, 188, 0.637)"
                mt="100px"
                mb="10px"
              />
            </div>
          </Link>
          <Link href="/auth/registro">
            <div>
              <Button text="Registrarse" bg="#e8e8e8" hover="#cececec3" />
            </div>
          </Link>
        </>
      ) : (
        <>
          <ul>
            <Link href="/usuario">
              <ListItem>
                <Icon fill="fa-solid fa-user" margin="0" />
                <p>Perfil</p>
              </ListItem>
            </Link>
            <Link href="/direccion/agregar-domicilio">
              <ListItem>
                <Icon fill=" fa-regular fa-address-book" margin="0" />
                <p>Agregar dirección</p>
              </ListItem>
            </Link>
            <Link href={""}>
              <ListItem>
                <Icon fill="fa-solid fa-tags" margin="0" />
                <p>Mis compras</p>
              </ListItem>
            </Link>
            <ListItem onClick={handleClick}>
              <Icon fill="fa-solid fa-arrow-right-from-bracket" margin="0" />
              <p>Cerrar sesión</p>
            </ListItem>
          </ul>
        </>
      )}
    </AsideMenu>
  );
};
export default NavLateral;
