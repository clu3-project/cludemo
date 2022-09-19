import styles from '../styles/Explain.module.css';
import Buterin from "../assets/explain.svg";
import FadeIn from 'react-fade-in';
const Explain = () => {

    return (

        <div className={styles.rectangle}>
            <FadeIn>
                <Buterin />
            </FadeIn>
        </div>
    )

}
export default Explain;