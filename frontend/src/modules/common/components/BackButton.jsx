import { useNavigate } from "react-router-dom";
import {FormattedMessage} from 'react-intl';


const BackButton = () => {
    const navigate = useNavigate();

    return(
        <div>
            <button className="btn btn-secondary mx-2" onClick={() => navigate(-1)}>
                <FormattedMessage id="persiguebuses.common.backlink"/>
            </button>
        </div>
    )
}

export default BackButton;