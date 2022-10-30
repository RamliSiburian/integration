import { Container } from 'react-bootstrap';
import { Populars } from '../Data-Dummy/Popular-restaurant'
export const PopularList = () => {
    return (
        <div style={{ backgroundColor: "#e5e5e5" }}>
            <Container>
                <div className="head pt-5">
                    <p className='fw-bold fs-1'>Popular Restaurant</p>
                    <hr />
                </div>
                <div className="popular-list mt-4 d-md-flex flex-wrap gap-4 flex-row justify-content-lg-between justify-content-center">
                    {Populars.map((item, key) => {
                        return (
                            <div className='popular-item d-flex gap-3 p-2 mt-3 mt-md-0 shadow rounded align-items-center ' key={key}>
                                <img src={item.image} alt={item.name} />
                                <h5>{item.name}</h5>
                            </div>
                        )
                    })}
                </div>
            </Container>
        </div>
    );
};