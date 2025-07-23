import Nav from 'react-bootstrap/Nav';
import { FormattedMessage } from 'react-intl';

const Header = () => {
    return (
        <header>
            <nav className="navbar bg-primary">
                <div className="container-fluid">
                    <a href="/" className="text-decoration-none d-flex align-items-center">
                        <img src="/map.svg" alt="Logo" width="24" height="24" className="me-2" />
                        <span className="navbar-brand mb-0 h1">
                            GTFS Editor
                        </span>
                    </a>
                    <div className="d-flex gap-3">
                        <Nav.Link href="/agencies">
                            <FormattedMessage id="gtfs-editor.nav.agencies" defaultMessage="Agencias" />
                        </Nav.Link>
                        <Nav.Link href="/routes">
                            <FormattedMessage id="gtfs-editor.nav.routes" defaultMessage="Rutas" />
                        </Nav.Link>
                        <Nav.Link href="/calendar">
                            <FormattedMessage id="gtfs-editor.nav.calendar" defaultMessage="Calendario" />
                        </Nav.Link>
                        <Nav.Link href="/stops">
                            <FormattedMessage id="gtfs-editor.nav.stops" defaultMessage="Paradas" />
                        </Nav.Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
