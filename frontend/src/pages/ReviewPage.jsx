import React, { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaComment } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import { useNavigate, useParams } from "react-router-dom";
import ActionButton from "../components/ActionButton";
import OpinionFilterForm from "../components/forms/OpinionFilterForm";
import OpinionForm from "../components/forms/OpinionForm";
import OpinionList from "../components/opinion/OpinionList";
import AuthService from "../services/auth.service";
import opinionService from "../services/opinion.service";

function Reviews() {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const { id } = useParams();

  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState({
    calificacion: "",
    comentario: "",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    totalPages: 0,
  });

  const [showOpinionModal, setShowOpinionModal] = useState(false);

  const calificacionPromedio = useMemo(() => {
    if (reviews.length === 0) return 0;

    const suma = reviews.reduce(
      (acc, review) => acc + Number(review.calificacion),
      0
    );
    const result = suma / reviews.length;
    console.log("Promedio de calificación:", result);
    return result;
  }, [reviews]);

  const makeRequest = async (page = 1) => {
    try {
      const filters = {
        id_bar: id,
        calificacion: Number(filter.calificacion),
        comentario: filter.comentario,
        page,
        perPage: pagination.perPage,
      };

      const { data } = await opinionService.getAll(filters);

      setReviews(data.results);
      setPagination((prev) => ({
        ...prev,
        currentPage: data.currentPage,
        totalPages: data.totalPages,
      }));
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  const sendOpinion = async (newOpinion) => {
    try {
      await opinionService.create(
        {
          ...newOpinion,
          id_bar: id,
          id_usuario: currentUser.id_usuario,
        },
        currentUser.nombre_usuario
      );
      setShowOpinionModal(false);
      await makeRequest(1);
    } catch (error) {
      console.error("Error al guardar la opinión:", error);
    }
  };

  useEffect(() => {
    makeRequest(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <div className="app-container">
        <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap">
          <div>
            <h1>Opiniones</h1>
            <div className="d-flex align-items-center gap-2">
              <ReactStars
                key={calificacionPromedio}
                count={5}
                value={calificacionPromedio}
                size={20}
                edit={false}
                isHalf={true}
                activeColor="#FFD700"
              />
              <span className="fw-semibold">
                {calificacionPromedio.toFixed(2)}
              </span>
              <span className="text-muted">({reviews.length} opiniones)</span>
            </div>
          </div>

          <ActionButton
            className="d-flex align-items-center mt-2 mt-md-0"
            type="primary"
            iconLeft={<FaComment />}
            onClick={() => setShowOpinionModal(true)}
          >
            Escribir una opinión
          </ActionButton>
        </div>

        <Row>
          {/* Sección Filtros */}
          <Col xs={12} md={4} lg={3}>
            <OpinionFilterForm
              filter={filter}
              totalReviews={reviews.length}
              setFilter={setFilter}
            />
          </Col>
          {/* Sección Lista de opiniones */}
          <Col xs={12} md={8} lg={9}>
            <OpinionList
              reviews={reviews}
              pagination={pagination}
              makeRequest={makeRequest}
            />
          </Col>
        </Row>

        <OpinionForm
          onShow={setShowOpinionModal}
          show={showOpinionModal}
          onSubmit={sendOpinion}
        />
      </div>
    </div>
  );
}

export default Reviews;
