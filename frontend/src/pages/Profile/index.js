import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";

import logoImg from "../../assets/logo.svg";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: ongId,
        },
      })
      .then(
        (response) => {
          setIncidents(response.data);
        },
        [ongId]
      );
  });
  async function handleDelete(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (error) {
      alert("Erro ao deletar, tente novamente");
    }
  }

  function handleLogOut() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem vindo, {ongName}</span>
        <Link className="button" to="/incident/new">
          Cadastrar novo caso
        </Link>
        <button type="button" onClick={handleLogOut}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map((incident) => (
          <li>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(incident.value)}
            </p>

            <button onClick={() => handleDelete(incident.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
