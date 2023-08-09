class Carousel{
    constructor(container, items, controls, info){
        this.carouselContainer = container;
        this.carouselArray = [...items];
        this.carouselControls = controls;
        this.itemInfo = info;
        this.hideInfo = () => this.itemInfo.style.display = 'none';
        this.showInfo = (e) => {
            this.itemInfo.style.display = 'flex';
            this.itemInfo.style.left = `${(e.clientX - this.itemInfo.offsetWidth / 2) - 40}px`;
            this.itemInfo.style.top = `${(e.clientY - this.itemInfo.offsetHeight / 2) - 40}px`;
        }
    }

    init(){
        this.setControls();
        this.useControls();

        this.carouselArray.forEach(item => {
            if(item.className === 'gallery-item gallery-item-3') {
                this.addInfoListeners(item);
                this.itemInfo.innerText = item.getAttribute('info');
            } 
        });
        this.prueba();

    }

    
    removeInfoListeners() {
        this.carouselArray.forEach(item => {
            item.removeEventListener('mousemove', this.showInfo);
            item.removeEventListener('mouseout', this.hideInfo);
        });
    }

    setLittleInfo(){
        this.itemInfo.style.display = 'flex';
        this.itemInfo.style.top = '20%';
        this.itemInfo.style.left = '5%';
        this.itemInfo.style.width = '80%';
        this.itemInfo.style.height = '65%';
        this.itemInfo.style.backgroundColor = '#5a5e5ae1';
    }

    prueba(){
        let btnInfo = document.querySelector('.material-symbols-outlined');

        btnInfo.addEventListener('click', () => {
            if(this.itemInfo.style.display = 'flex'){
                this.itemInfo.style.display = 'none';
            }
        })

        document.addEventListener('DOMContentLoaded', () => {
            if(innerWidth>=280 && innerWidth<=620){
                this.removeInfoListeners();
                btnInfo.addEventListener('dblclick', () => {
                    if(this.itemInfo.style.display = 'none'){
                        console.log('btn info clicked');
                        this.setLittleInfo();
                    }
                });
            }
        });
        
        window.addEventListener('resize', () => {
            if(innerWidth>=280 && innerWidth<=620){
                this.removeInfoListeners();
                btnInfo.addEventListener('dblclick', () => {
                    console.log('btn info clicked');
                    this.setLittleInfo();
                });
            }else {
                this.carouselArray.forEach(item => {
                    if(item.className === 'gallery-item gallery-item-3') {
                        this.addInfoListeners(item);
                        this.itemInfo.innerText = item.getAttribute('info');
                    } 
                });
            }
        })
    }
    
    addInfoListeners(item){
        item.addEventListener('mousemove', this.showInfo);
        item.addEventListener('mouseout', this.hideInfo);
    }
    
    updateGallery(){
        this.carouselArray.forEach(el => {
            for(let i=1; i<=24; i++) el.classList.remove(`gallery-item-${i}`)
        });
    
        this.carouselArray.slice(0, 5).forEach((el, i) => el.classList.add(`gallery-item-${i+1}`));
    
        this.carouselArray.forEach(item => {
            if(item.className === 'gallery-item gallery-item-3') {
                this.addInfoListeners(item);
                this.itemInfo.innerText = item.getAttribute('info');
            } 
        });
    
        if(innerWidth>=280 && innerWidth<=620){
            this.removeInfoListeners();
            console.log(this.itemInfo);
        }
    }

    setCurrentState(direction){
       if(direction.className == 'gallery-controls-previous'){
            this.carouselArray.unshift(this.carouselArray.pop());
        } else{
            this.carouselArray.push(this.carouselArray.shift());
        }
        
        this.updateGallery();
    }

    setControls(){
        this.carouselControls.forEach(control => {
            galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
            document.querySelector(`.gallery-controls-${control}`).innerText = control;
        });
    }

    useControls(){
        const triggers = [...galleryControlsContainer.childNodes];
        triggers.forEach(control => {
            control.addEventListener('click', e => {
                e.preventDefault();
                this.removeInfoListeners();
                this.setCurrentState(control);
            });
        });
    }
}

const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryControls = ['previous', 'next'];
const itemInfo = document.querySelector('.info');

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls, itemInfo);
exampleCarousel.init();