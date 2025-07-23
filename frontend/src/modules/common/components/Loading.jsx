import {FormattedMessage} from 'react-intl';

const Loading = ({type}) => {
    const idMessage = `persiguebuses.loading.${type}`;

    return(
        <div className='d-flex flex-column align-items-center justify-content-center'>
            <h2 className="mb-5 text-white text-center"><FormattedMessage id={idMessage}/></h2>
            <div className='d-flex justify-content-center'>
                <div className="spinner-border text-danger" role="status"></div>
            </div>
        </div>
    )
}

export default Loading;