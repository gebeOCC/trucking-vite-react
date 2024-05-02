import VehiclesAdd from "./VehiclesAdd";
import { useParams } from 'react-router-dom';

function VehiclesEdit() {
    let { id } = useParams();
    return(
        <>
            <VehiclesAdd id={id} />
        </>
    )
}

export default VehiclesEdit;