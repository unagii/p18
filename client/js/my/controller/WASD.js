
pc.script.create("keyboard_handler", function (app) {

    var KeyboardHandler = function (entity) {
        this.entity = entity;



    };

    KeyboardHandler.prototype = {
        initialize: function () {



            // Use on() to listen for events on the keyboard device.
            // Arguments are:
            // 1) The event name to listen for
            // 2) The callback function to call when the event fires
            // 3) (optional) The value to use for 'this' in the callback function
            app.keyboard.on(pc.EVENT_KEYDOWN, this.onKeyDown, this);
            app.keyboard.on(pc.EVENT_KEYUP, this.onKeyUp, this);

           // this.redMaterial = app.assets.find("Red", pc.asset.ASSET_MATERIAL);
            //this.whiteMaterial = app.assets.find("White", pc.asset.ASSET_MATERIAL);

           // alert(this.entity.keyboard)

        },

        update: function (dt) {


          //
            /*
             * Notice in the demo that pressing and holding the arrow keys doesn't
             * make the block spin. wasPressed() is used to detect a
             * keypress that occurred since the last frame and will only be
             * called once even if the key is held down.
             */
           // var angle = 0;
           // if (app.keyboard.wasPressed(pc.KEY_LEFT)) {
            //    alert("ddddddddddddddd")
           // }
          //  } else if (app.keyboard.wasPressed(pc.KEY_RIGHT)) {
           //     angle = 5;
           // }

            /*
             * Notice that pressing and holding the space bar makes the block
             * continuously spin. isPressed() is used to detected if a
             * key is down right now. So it will be true every frame as long as
             * the key is still pressed.
             */
           // if (app.keyboard.isPressed(pc.KEY_SPACE)) {
           //     angle = 1;
           // }

            // Update the spinning cube
          //  this.entity.rotateLocal(0, angle, 0);
        },

        /*
         * Event handler called when key is pressed
         */
        onKeyDown: function (event) {
            // Check event.key to detect which key has been pressed

           // alert(event)


            if (event.key === pc.KEY_W) {
               // alert(this.entity.getPosition())
                this.entity.translate(1,0,0)
                  // .mothis.entitydel.materialAsset = this.redMaterial;
            }


            if (event.key === pc.KEY_A) {
                this.entity.translate(0,0,-1)
            }

            if (event.key === pc.KEY_S) {
                this.entity.translate(-1,0,0)
            }

            if (event.key === pc.KEY_D) {
                this.entity.translate(0,0,1)
           }



            // When the space bar is pressed this scrolls the window.
            // Calling preventDefault() on the original browser event stops this.
          //  event.event.preventDefault();
        },

        /*
         * Event handler called when key is released
         */
        onKeyUp: function (event) {
          //  alert("4x3g!!!!!!45")


            // Check event.key to detect which key has been pressed
          //  if (event.key === pc.KEY_A) {
           //     this.entity.model.materialAsset = this.whiteMaterial;
          //  }
        },
    };

    return KeyboardHandler;
});