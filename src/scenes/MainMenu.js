import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(512, 384, 'background');

        const obiWan = this.add.image(512, 300, 'obiwan');

        this.tweens.add({
            targets: obiWan,
            y: { value: 250, duration: 1500, ease: 'Sine.easeInOut', yoyo: -1, repeat:-1 }
        });

        this.add.text(512, 460, 'Obi Wan Kenobi', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });
    }
}
