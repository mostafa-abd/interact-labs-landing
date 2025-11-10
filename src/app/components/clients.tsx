import Image from "next/image"
import BMW from '../assets/images/BMW.svg'
import Mercedessvg from '../assets/images/Mercedessvg.svg'
import Coca from '../assets/images/Coca-Cola_logo.svg'
import Guc from '../assets/images/guc.jpg'
import Auc from '../assets/images/auc.png'
import Ain from '../assets/images/ain.png'
import Mansoura from '../assets/images/mansoura.png'
import Capital from '../assets/images/capital.png'

export default function Clients(){
    return(
        <section className="clients">
            <h1>Our Partners</h1>
            <div>
                <Image src={BMW} alt=" logo" fill/>
            </div>
                     <div>
                <Image src={Mercedessvg} alt=" logo" fill/>
            </div>
                     <div>
                <Image src={Coca} alt=" logo" fill/>
            </div>
                     <div>
                <Image src={Guc} alt=" logo" fill/>
            </div>
                     <div>
                <Image src={Auc} alt=" logo" fill/>
            </div>
                     <div>
                <Image src={Ain} alt=" logo" fill/>
            </div>
                     <div>
                <Image src={Mansoura} alt="bmw logo" fill/>
            </div>
                     <div>
                <Image src={Capital} alt="bmw logo" fill/>
            </div>
        </section>
    )
}