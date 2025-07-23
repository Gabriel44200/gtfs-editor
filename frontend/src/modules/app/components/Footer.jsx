import Lang from './Lang'

const Footer = () => {
    return(
        <footer>
            <div className="bg-primary d-flex justify-content-center align-items-center gap-3 h-100">
                <p className='m-0'>© 2025 GTFS Editor</p>
                <p className='m-0'> - </p>
                <Lang/>
            </div>
        </footer>
    );
}

export default Footer;