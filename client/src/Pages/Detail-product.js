import React from 'react'
import { Button, Card, Container } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { API } from '../config/Api';
import * as Icon from "react-icons/fa";

function DetailProduct() {
    const { user_id } = useParams();

    let { data: detailsProduct } = useQuery("detailsProductCache", async () => {
        const response = await API.get("/product/" + user_id);
        return response.data.data;
    })

    let { data: cekprofileslist } = useQuery("cekprofileslistcache", async () => {
        const response = await API.get("/Profile/" + user_id);
        return response.data.data.fullname;
    });

    return (
        <div style={{ backgroundColor: "#e5e5e5" }}>
            <Container>
                <div className="near-head pt-5 d-md-flex gap-2 align-items-center">
                    <p className="fs-5 fw-bold me-3"><Link to="/" className="text-danger"><Icon.FaArrowLeft /> Back |</Link> </p>
                    <p className="fw-bold fs-1">{cekprofileslist} Menus</p>
                </div>
                <hr />
                <div className="pb-5 mt-4 d-md-flex flex-row flex-wrap gap-5 justify-content-lg-start justify-content-md-center ">
                    {detailsProduct?.map((item, index) => (
                        <div>
                            <Card className="detail-restaurant mt-3 mt-md-0 shadow" key={index}>
                                <Card.Img variant="top" src={item?.image} style={{ height: "140px" }} />
                                <Card.Body>
                                    <Card.Title>{item?.name}</Card.Title>
                                    <Card.Text className='text-danger'>
                                        {item?.price}
                                    </Card.Text>
                                    <Button variant="warning" className='w-100'>Add to chart</Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>
            </Container >
        </div >
    )
}

export default DetailProduct;