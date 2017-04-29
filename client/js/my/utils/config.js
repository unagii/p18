/**
 * Created by unagii on 20.04.2017.
 */

/*/
пока будем хранть конфиги тут




 /*/

Conf=function() {

    this.sectorsInMap = 16;
    this.sectorSize = 256;
    this.warparound = false;


    var keyWords = [];
    keyWords[0] = 'unit';
    keyWords[1] = 'structure';
    keyWords[2] = 'fx';
    keyWords[3] = 'bullet';
    this.keyWords=keyWords


    var eType = [];
    eType[0] = { name:"t1", keyWords:["structure"]  ,color:0x00ff00,textureAtlas:"client/img/testTexture.json",texture:"Angel.ico",className:'my.mapControll.entity.Entity'};
    eType[1] = { name:"t2",keyWords:["structure"] ,color:0x00ff00,textureAtlas:"client/img/testTexture.json",texture:"Angel.ico",className:'my.mapControll.entity.Entity'};
    eType[2] = { name:"player", keyWords:["unit"],color:0x00ff00,textureAtlas:"client/img/testTexture.json",texture:"Angel.ico",className:'my.mapControll.entity.Unit'};
    eType[3] = { name:"mob", keyWords:["unit"],color:0xff0000,textureAtlas:"client/img/testTexture.json",texture:"Angel.ico",className:'my.mapControll.entity.Unit'};
    eType[4] = {name:"bullet", keyWords:["bullet"],color:0xff0000,textureAtlas:"client/img/testTexture.json",texture:"Devil.ico",className:'my.mapControll.entity.Bullet'};
    this.eType=eType


/*/
    var textureList = []
    textureList[0] = {"texture":"Alien.ico"}
    textureList[1] = {"texture":"Angel.ico"};
    textureList[2] = {"texture":"Baby.ico"};
    textureList[3] = {"texture":"Boxer.ico"};
    textureList[4] = {"texture":"Chef.ico"};
    textureList[5] = {"texture":"Clown.ico"};
    textureList[6] = {"texture":"Dad.ico"};
    textureList[7] = {"texture":"Devil.ico"};
    textureList[8] = {"texture":"Doctor.ico"};
    textureList[9] = {"texture":"Dragon.ico"};
    textureList[10] = {"texture":"Firefighter.ico"};
    textureList[11] = {"texture":"Ghost.ico"};
    textureList[12] = {"texture":"Girl.ico"};
    textureList[13] = {"texture":"Kid.ico"};
    textureList[14] = {"texture":"King.ico"};
    textureList[15] = {"texture":"Knight.ico"};
    textureList[16] = {"texture":"Lawyer.ico"};
    textureList[17] = {"texture":"Leprechaun.ico"};
    textureList[18] = {"texture":"Man.ico"};
    textureList[19] = {"texture":"Mermaid.ico"};
    textureList[20] = {"texture":"Monster.ico"};
    textureList[21] = {"texture":"Ninja.ico"};
    textureList[22] = {"texture":"Nurse.ico"};
    textureList[23] = {"texture":"Pirate.ico"};
    textureList[24] = {"texture":"Policeman.ico"};
    textureList[25] = {"texture":"Prince.ico"};
    textureList[26] = {"texture":"Princess.ico"};
    textureList[27] = {"texture":"Queen.ico"};
    textureList[28] = {"texture":"Robot.ico"};
    textureList[29] = {"texture":"Santa.ico"};
    textureList[30] = {"texture":"Snowman.ico"};
    textureList[31] = {"texture":"Superhero.ico"};
    textureList[32] = {"texture":"Teacher.ico"};
    textureList[33] = {"texture":"Troll.ico"};
    textureList[34] = {"texture":"Vampire.ico"};
    textureList[35] = {"texture":"Werewolf.ico"};
    textureList[36] = { "texture":"Witch.ico" };
    textureList[37] = { "texture":"Zombie.ico" };
    this.textureList=textureList
 /*/
}