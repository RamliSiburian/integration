import React, { useContext } from 'react'
import { Container, Table } from 'react-bootstrap';
import * as Icon from "react-icons/fa";
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { API } from '../config/Api';
import imgEmpty from '../Assets/Image/empty.png';
import rupiah from 'rupiah-format';
import { UserContext } from '../context/User-context';
function Product() {
    const [state, dispatch] = useContext(UserContext);

    const user_id = state.user.id

    let { data: productList } = useQuery("productListCache", async () => {
        const response = await API.get("/product/" + user_id);
        return response.data.data;
    })
    console.log(productList);


    return (
        <>
            <Container>
                <div className="product">
                    <p className="h1 mt-4">List Product</p>
                    <hr />
                    <div className="add-produc text-end mb-3">
                        <Link to={"/AddProduct"} className="btn btn-primary">Add Product <Icon.FaPlusCircle /></Link>
                    </div>
                    {productList?.length !== 0 ? (
                        <Table striped bordered hover variant='primary'>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Image</th>
                                    <th>Product Name</th>
                                    <th>Description</th>
                                    <th>price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productList?.map((item, index) => (
                                    <tr key={item?.id}>
                                        <td className="align-middle text-center">{index + 1}</td>
                                        <td className="align-middle">
                                            <img
                                                src={item?.image}
                                                style={{
                                                    width: "80px",
                                                    height: "80px",
                                                    objectFit: "cover",
                                                }}
                                                alt={item?.name}
                                            />
                                        </td>
                                        <td className="align-middle">{item?.name}</td>
                                        <td className="align-middle">
                                            {item?.desc}
                                        </td>
                                        <td className="align-middle">
                                            {rupiah.convert(item?.price)}
                                        </td>
                                        <td className="align-middle">{item?.qty}</td>
                                    </tr>
                                )
                                )}
                            </tbody>
                        </Table>
                    ) : (
                        <div className="text-center pt-5">
                            <img
                                src={imgEmpty}
                                className="img-fluid rounded"
                                style={{ width: "20%" }}
                                alt="empty"
                            />
                            <div className="mt-3 text-danger fw-bold fs-3">No data product</div>
                        </div>
                    )}
                </div>
            </Container>
        </>
    )
}

export default Product;