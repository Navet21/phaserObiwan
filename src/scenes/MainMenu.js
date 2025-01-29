import { Scene } from 'phaser';




export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    

        this.llamadaApi = () => {
            console.log("Esta funcionando");
            fetch('https://bicicletas.onrender.com/api/bicicletas')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    console.log(data.length);
        
                    if (data) { // Verificar que haya datos
                        data.bicicletas.forEach((bicicleta, index) => {
                            this.add.text(800, 460 + (index * 50), // Posición en Y aumenta por cada bicicleta
                                `🚲 ${bicicleta.modelo || "Modelo desconocido"}`, 
                                {
                                    fontFamily: 'Arial Black',
                                    fontSize: '24px',
                                    color: '#ffffff',
                                    stroke: '#000000',
                                    strokeThickness: 6,
                                    align: 'center'
                                }
                            );
                        });
                    } else {
                        console.error("No se encontraron bicicletas en la API.");
                    }
                })
                .catch(error => console.error('Error al obtener las bicicletas:', error));
        }
        
    
}
    

    create ()
    {
        this.add.image(512, 384, 'background');

        const obiWan = this.add.image(512, 300, 'obiwan');
        obiWan.setInteractive();

        this.tweens.add({
            targets: obiWan,
            y: { value: 250, duration: 1500, ease: 'Sine.easeInOut', yoyo: -1, repeat:-1 }
        });

        this.add.text(512, 460, 'Obi Wan Kenobi', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);


        obiWan.on('pointerdown', function ()
        {

            this.llamadaApi();

        },this);
    }
}
