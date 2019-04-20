import Phaser from 'phaser';

enum Side {
  LEFT,
  RIGHT
}

enum Player {
  ME,
  PARTICIPANT
}

export default class Scene extends Phaser.Scene {

  game;
  cursors;
  scene;

  start_x = 420;
  start_y = 680;
  end_x = 850;
  end_y = 255;

  start_x2 = 1335;
  start_y2 = 680;
  end_x2 = 890;
  end_y2 = 255;

  currentBlock = 0;

  getPositionLeft(progress) {
    const x_len = this.end_x - this.start_x;
    const y_len = this.end_y - this.start_y;

    const x_prog = this.start_x + x_len*progress;
    const y_prog = this.start_y + y_len*progress;

    return {x: x_prog, y: y_prog};
  }

  getPositionRight(progress) {
    const x_len = this.start_x2 - this.end_x2;
    const y_len = this.end_y2 - this.start_y2;

    const x_prog = this.start_x2 - x_len*progress;
    const y_prog = this.start_y2 + y_len*progress;

    return {x: x_prog, y: y_prog};
  }

  createPlayer(who, side) {
    let player;

    let type = who === Player.ME ? Player.ME.toString() : Player.PARTICIPANT.toString()

    if(side === Side.LEFT) {
      player = this.impact.add.image(this.start_x, this.start_y, type);
    } else {
      player = this.impact.add.image(this.start_x2, this.start_y2, type);
    }
    
    player.setMaxVelocity(300, 400).setFriction(800, 0);
    player.body.accelGround = 1200;
    player.body.accelAir = 600;
    player.body.jumpSpeed = 300;
    return player;
  }

  movePlayerLeft(player, progress) {
    const coords = this.getPositionLeft(progress);

    player.x = coords.x;
    player.y = coords.y;
  }

  movePlayerRight(player, progress) {
    const coords = this.getPositionRight(progress);

    player.x = coords.x;
    player.y = coords.y;
  }

  simulateBlockTime(player) {
    console.log(`New block`);
    const coords = this.getPositionLeft(0.1*this.currentBlock);

    player.x = coords.x;
    player.y = coords.y;

    this.currentBlock++;
    console.log(coords);
  }

  preload() {
    this.load.tilemapTiledJSON('map', 'impact-tilemap.json');
    this.load.image('kenney', 'kenney.png');
    this.load.image(Player.PARTICIPANT.toString(), 'phaser-dude.png');
    this.load.image(Player.ME.toString(), 'rick.png');
  }

  player1;
  player2;
  player3;
  player4;

  create() {
    console.log(this);

    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('kenney');
    const layer = map.createStaticLayer(0, tileset, 0, 0);

    // this.repeat(delay, repeatCount, callback, callbackContext, arguments)
 
    // Any tile with the collides property set to true (in Tiled) will be set to collide
    layer.setCollisionByProperty({ collides: true });
 
    // Impact collisions with the world work by using slope IDs. An ID of 0 is non-colliding, an ID
    // of 1 is a solid rectangle, an ID of 2 is a 45 degree upward slope, etc. Check out this visual
    // reference:
    // https://github.com/photonstorm/phaser3-examples/blob/master/public/assets/tilemaps/tiles/slopes.png
 
    // We need to construct a collision map (of slope IDs) in order to register collisions with a
    // tilemap layer. We can do this in one of two ways:
 
    // Method 1. If we assign the slope IDs as tile properties in Tiled's tileset editor, we can
    // load them by passing in the property name, e.g. impact-tilemap.json has a property on every
    // tile called "slope":
    // @ts-ignore
    this.impact.world.setCollisionMapFromTilemapLayer(layer, { slopeProperty: 'slope' });

    // Method 2. If we don't have slopes defined in Tiled, we can manually map tile index to slope
    // ID using an object:
    // var slopeMap = { 32: 1, 77: 1, 82: 1, 95: 24, 137: 2, 140: 24, 36: 2 };
    // this.impact.world.setCollisionMapFromTilemapLayer(layer, { slopeMap: slopeMap });
 
    // Note: the collision map is static! If you remove/change the colliding tiles, it will not be
    // updated.
 
    this.player1 = this.createPlayer(Player.PARTICIPANT, Side.LEFT);
    this.player2 = this.createPlayer(Player.ME, Side.LEFT);
    this.player3 = this.createPlayer(Player.PARTICIPANT, Side.RIGHT);
    this.player4 = this.createPlayer(Player.PARTICIPANT, Side.RIGHT);
 
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player1);
 
    this.cursors = this.input.keyboard.createCursorKeys();
 
    const help = this.add.text(16, 16, 'Buy and sell up and down the bonding curve to move.', {
        fontSize: '18px',
        fill: '#ffffff'
    });
    help.setScrollFactor(0);

    // this.impact.world.

    // this.physics.moveTo(this.player, this.end_x, this.end_y);
  }

  lastUpdateTime = 0;

  update(time, delta) {
    console.log(time - this.lastUpdateTime);
    if(time - this.lastUpdateTime > 5000) {
      // this.movePlayerLeft(this.player1, 0.1);
      // this.movePlayerLeft(this.player2, 0.5);
      // this.movePlayerRight(this.player3, 0.3);
      // this.movePlayerRight(this.player4, 1);
      this.lastUpdateTime = time;
    }

    this.movePlayerLeft(this.player1, 0.1);
    this.movePlayerLeft(this.player2, 0.5);
    this.movePlayerRight(this.player3, 0.3);
    this.movePlayerRight(this.player4, 1);

    // this.simulateBlockTime();
  }
}

