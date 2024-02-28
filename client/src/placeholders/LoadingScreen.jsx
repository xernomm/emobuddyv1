import React from "react";
import Spinner from 'react-bootstrap/Spinner';

export default function LoadingSpinner() {
  return (
    <>
   <div className="container">
   <Spinner animation="border" />
   </div>
    </>
  );
}
