export const cardPlayTiming = {
    duration: 1500
}

export const animateCard = (id: string) => {
    const div = document.getElementById(id)!
    let xPos = div.getBoundingClientRect().x
    let yPos = div.getBoundingClientRect().y
    const deck = document.getElementById('card-deck')!
    const {x, y} = deck.getBoundingClientRect()

    const topCenter = window.innerHeight / 2 - div.clientHeight / 2
    const leftCenter = window.innerWidth / 2 - (xPos + (div.clientWidth / 2))

    const keyFrames = [
        { transform: 'translate(0,0)' },
        { transform: `translate(${leftCenter}px,-${topCenter}px)` },
        { transform: `translate(${(x + deck.clientWidth * 1.2) - xPos}px,${y - yPos}px)` }
    ];

    div.animate(keyFrames, cardPlayTiming)
}

export const animatePlay = (id: string) => {
    const div = document.getElementById(id)!
    let xPos = div.getBoundingClientRect().x
    let yPos = div.getBoundingClientRect().y
    const deck = document.getElementById('card-deck')!
    const {x, y} = deck.getBoundingClientRect()

    const topCenter = window.innerHeight / 2 - div.clientHeight / 2
    const leftCenter = window.innerWidth / 2 - (xPos + (div.clientWidth / 2))
    
    div.style.transform = `translate(${leftCenter}px,-${topCenter}px)`

    setTimeout(() => {
        xPos = div.getBoundingClientRect().x
        yPos = div.getBoundingClientRect().y
        div.style.transform += `translate(${(x + deck.clientWidth * 1.2) - xPos}px,${y - yPos}px)`
    }, cardPlayTiming.duration)
}

export const animateDraw = (id: string) => {
    const div = document.getElementById(id)!
    div.style.transform = 'translate(0,0)'
}

export class Animator {

    isAnimating: boolean = false
    animateTime: number = 1500

    async animatePlay(id: string) {
        this.isAnimating = true
        const div = document.getElementById(id)!
        let xPos = div.getBoundingClientRect().x
        const deck = document.getElementById('card-deck')!
    
        const topCenter = window.innerHeight / 2 - div.clientHeight / 2
        const leftCenter = window.innerWidth / 2 - (xPos + (div.clientWidth / 2))
        
        div.style.transform = `translate(${leftCenter}px,-${topCenter}px)`

        await this.animateTimer(this.animateTime)
    }

    async animateDraw(id: string) {
        this.isAnimating = true
        const div = document.getElementById(id)!
        div.style.transform = 'translate(0,0)'
        await this.animateTimer(this.animateTime)
        this.isAnimating = false
    }

    async animateDiscard(id: string) {
        this.isAnimating = true
        const div = document.getElementById(id)!
        const xPos = div.getBoundingClientRect().x
        const yPos = div.getBoundingClientRect().y
        const deck = document.getElementById('card-deck')!
        const {x, y} = deck.getBoundingClientRect()
        
        div.style.transform += `translate(${(x + deck.clientWidth * 1.2) - xPos}px,${y - yPos}px)`

        await this.animateTimer(this.animateTime)
        this.isAnimating = false
    }

    async endAnimate() {
        setTimeout(() => {
            this.isAnimating = false
        }, this.animateTime)
    }

    animateTimer(time: number) {
        return new Promise(resolve => setTimeout(resolve, time))
    }
}