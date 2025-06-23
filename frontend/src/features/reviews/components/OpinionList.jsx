import { Col, Row } from "react-bootstrap";
import OpinionCard from "./OpinionCard";

import NoDataText from "../../../shared/components/NoDataText";
import CustomPagination from "../../../shared/components/Pagination";

function OpinionList({ reviews, pagination, makeRequest }) {
  return (
    <div style={{ minHeight: "20rem", maxHeight: "30rem" }}>
      <Row className="g-3">
        {reviews.length === 0 && <NoDataText className="text-center" />}
        {reviews.map((review) => (
          <Col xs={12} key={review.id_opinion}>
            <OpinionCard review={review} />
          </Col>
        ))}
      </Row>

      <CustomPagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={makeRequest}
      />
    </div>
  );
}

export default OpinionList;
