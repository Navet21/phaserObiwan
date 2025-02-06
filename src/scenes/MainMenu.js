import { Scene } from 'phaser';
import { Bugfender } from '@bugfender/sdk';




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
                .then(
                    Bugfender.log("La api se ha llamado correctamente")
                )
                .catch(error => console.error('Error al obtener las bicicletas:', error))
                .then(error => Bugfender.log("Ha habido un error en la llamada a la api",error))
        
        }
        
        this.generarError = () =>{
            const errores = [
                () => { throw new Error('Este es un error de prueba tipo 1'); },
                () => { throw new TypeError('Este es un error de tipo'); }
            ];
    
            // Elegir aleatoriamente un error y lanzarlo
            const errorAleatorio = Phaser.Math.Between(0, errores.length - 1);
            errores[errorAleatorio]();
        }
}
    

    create ()
    {
        this.add.image(512, 384, 'background');

        const obiWan = this.add.image(512, 300, 'obiwan');
        obiWan.setInteractive();

        const button = this.add.image(800, 100, 'btnverde').setInteractive();
        const button2 = this.add.image(800, 400, 'btnrojo').setInteractive();


        button.on('pointerdown', () => {
            try {
                this.generarError();
            } catch (error) {
                Bugfender.error(`Error atrapado: ${error.message}`);
                console.error(error);
            }
        });

        button2.on('pointerdown', () => {
            try {
                this.generarError();
            } catch (error) {
                Bugfender.error(`Error 2 atrapado: ${error.message}`);
                console.error(error);
            }
        });

        

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
            Bugfender.log("Se ha pulsado el botón de Obi Wan");

        },this);
    }
}
