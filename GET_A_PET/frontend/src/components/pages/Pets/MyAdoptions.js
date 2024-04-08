import api from '../../../utils/api'

import { useState, useEffect } from 'react'

import styles from './Dashboard.module.css'

import RoundedImage from '../../layouts/Roundedimage'

function MyAdoptions(){
    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(()=> {
        api.get('/pets/myadoptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })
        .then((response)=> {
            setPets(response.data.pets)
        })
    }, [token])

    return (
        <section>
            <div className={styles.petlist_header}>
                <h1>Minhas adoções</h1>
            </div>
            <div className={styles.petlist_header}>
                {pets.length > 0 &&
                    pets.map((pet)=> (
                        <div key={pet._id} className={styles.petlist_row}>
                            <RoundedImage 
                                src={`${process.env.REACT_APP_API}/imagens/pets/${pet.imagens[0]}`}
                                width="px75"
                            />
                            <span className='bold'>{pet.name}</span>
                            <div className={styles.contacts}>
                                <p>
                                    <span>Ligue para:</span> {pet.user.phone}
                                </p>
                                <p>
                                    <span>Fale com:</span> {pet.user.name}
                                </p>
                            </div>
                            <div className={styles.actions}>
                                {pet.available ? (
                                    <p>Adoção em processo</p>
                                ) : (
                                    <p>Parabéns por concluir a adoção</p>
                                )}
                            </div>
                        </div>
                    ))                
                }
                {pets.length === 0 && <p>Ainda não há adoçôes disponiveis.</p>}
            </div>
        </section>
    )
}

export default MyAdoptions