import { FormattedMessage } from 'react-intl';

const Home = () => {
    return(
        <div className="m-height d-flex flex-column align-items-center justify-content-center">
            <h2 className="mb-3 text-black text-center"><FormattedMessage id="gtfs-editor.home.text"/></h2>
            <a className="btn btn-outline-primary mb-3" href="/stops" role="button"><FormattedMessage id="gtfs-editor.home.button"/></a>
            <img src="/metro-map.jpg" alt="Tranvias Coruña Bus" width="40%" height="30%"/>
        </div>
        
    );
};

export default Home;