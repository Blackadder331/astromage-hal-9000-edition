// Packages
import Image from 'next/image'

// Utils
import { Animator } from '../../utils/animations'

// Constants
import { cardTypeIcons, resMap } from '../../constants'

// Styles
import styles from './card.module.css'

// Types
import { PlayerStats, CardObject, ActiveCard } from '../../types'
import { imageFilename } from './imageFilename'

export type Props = {
    card: CardObject
    stats: PlayerStats
    turn: number
    cardNum: number
    active: number | null
}

const Card = ({ card, stats, turn, cardNum, active }: Props) => {
    
    const img = cardTypeIcons[card.type]
    const isActive = active === cardNum
    const disabled = (!isActive && active) || card.cost > stats[resMap[card.type]]

    return (
        <>
            <div id={`card-${cardNum}`} className={`${styles[`${card.type}`]} ${styles.cardBody} ${(!disabled && !isActive && turn !== 2) && styles.hoverEffect}`}>
                {(turn === 2 && !isActive) && <div className='card-back'></div>}
                <div hidden={!disabled || isActive} className={styles.disabled}></div>
                <span className={styles.titleSpan}>{card.name}</span>
                <div className={styles.imgContainerDiv}>
                    <img className={styles.img} src={imageFilename(card.name)} />
                </div>
                <span className={styles.textSpan}>{card.description}</span>
                <span className={styles.cardCost}>{card.cost}</span>
                <div className={styles.cardIcon}>
                    <Image width={20} height={20} alt={`${card.type} icon`} src={img} />
                </div>
            </div>
        </>

    )
}

export default Card
