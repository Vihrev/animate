(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.tylernixPQeoQdkU9jQunsplash1 = function() {
	this.initialize(img.tylernixPQeoQdkU9jQunsplash1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,640,960);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol15 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("A8qXuQgqAAgdgdQgdgeAAgpMAAAgsTQAAgpAdgdQAdgeAqAAMA5VAAAQAqAAAdAeQAdAdAAApMAAAAsTQAAApgdAeQgdAdgqAAg");
	this.shape.setTransform(193.525,151.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol15, new cjs.Rectangle(0,0,387.1,303.6), null);


(lib.Symbol14 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#60B10F").s().p("AARA2IAAhDQAAgJgEgEQgEgEgIAAQgLAAgGAKIAABKIgdAAIAAhpIAbAAIAAAMQAMgOASAAQARAAAIAKQAJAKAAATIAABEg");
	this.shape.setTransform(129.6,24.225);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#60B10F").s().p("AgkAoQgNgPAAgZIAAAAQAAgQAGgMQAGgMAMgHQALgHAOAAQAVAAAOANQANANACAXIAAAGQAAAYgNAPQgOAPgXAAQgWAAgOgPgAgPgXQgGAIAAAQQAAAPAGAIQAGAIAJAAQAKAAAGgIQAGgIAAgQQAAgPgGgIQgGgIgKAAQgJAAgGAIg");
	this.shape_1.setTransform(118.35,24.325);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#60B10F").s().p("AgNBKIAAhpIAbAAIAABpgAgKgwQgFgEAAgGQAAgHAFgEQAEgEAGAAQAHAAAEAEQAFAEAAAHQAAAGgFAEQgEAEgHAAQgGAAgEgEg");
	this.shape_2.setTransform(110.1,22.225);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#60B10F").s().p("AgPAlIAAg4IgQAAIAAgVIAQAAIAAgaIAbAAIAAAaIASAAIAAAVIgSAAIAAA0QAAAFACADQACACAHAAIAIAAIAAAVQgIADgJAAQgdAAAAgeg");
	this.shape_3.setTransform(103.95,23.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#60B10F").s().p("AgjAuQgLgJAAgOQAAgRAMgIQANgJAWAAIAOAAIAAgGQAAgHgEgFQgEgEgHAAQgHAAgEADQgEAEgBAGIgbAAQAAgJAFgIQAGgIAKgEQALgFAMAAQATAAALAKQAMAKAAASIAAAsQAAAPAEAIIAAACIgdAAIgCgKQgLAMgPAAQgPAAgKgJgAgRATIAAACQAAAFADAEQAEADAGAAQAFAAAGgDQAFgCADgFIAAgSIgLAAQgUAAgBAOg");
	this.shape_4.setTransform(95.35,24.325);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#60B10F").s().p("AggAoQgNgOAAgZIAAgBQAAgZANgOQANgPAVAAQAUAAAMALQAMAMAAASIgaAAQAAgIgFgFQgFgFgIAAQgJAAgFAHQgFAHAAAQIAAACQAAARAFAHQAFAHAJAAQAIAAAFgEQAFgFAAgHIAaAAQAAALgGAJQgFAJgKAFQgKAFgMAAQgWAAgNgPg");
	this.shape_5.setTransform(84.875,24.325);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#60B10F").s().p("AgkAuQgKgJAAgOQAAgRANgIQAMgJAXAAIAMAAIAAgGQAAgHgDgFQgEgEgHAAQgHAAgEADQgFAEABAGIgcAAQgBgJAGgIQAGgIAKgEQALgFAMAAQATAAAMAKQALAKAAASIAAAsQAAAPAEAIIAAACIgcAAIgEgKQgKAMgPAAQgPAAgLgJgAgSATIAAACQAAAFAEAEQAEADAGAAQAFAAAGgDQAFgCACgFIAAgSIgKAAQgUAAgCAOg");
	this.shape_6.setTransform(74.25,24.325);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#60B10F").s().p("AgOBHIgyiNIAhAAIAfBpIAghpIAhAAIgyCNg");
	this.shape_7.setTransform(62.325,22.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#917347").s().p("AgcBTQgFAAgDgEQgDgDAAgFIAeiRQABgIAIAAQAIAAACAIIAdCRQABAFgDADQgDAEgFAAg");
	this.shape_8.setTransform(94.3075,0.275);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#60B10F").s().p("ABNBVIhNhMIhLBMQgGAFgHgDQgGgEABgHIAQhOIg8AqQgFAEgHgEQgGgEABgHQAHgmAagfQAYgfAkgQQAFgCAFADIAzAlIA0glQAFgDAFACQAkAQAZAfQAZAfAGAmQACAHgGAEQgGAEgGgEIg7gqIAPBOQACAHgIAEIgFABQgDAAgDgDg");
	this.shape_9.setTransform(94.3,-11.7469);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#216B46").ss(2,1,1).p("Aqwn7IVhAAIgDINIqwHqIqunqg");
	this.shape_10.setTransform(97.85,18.1);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AqwASIAAoNIVhAAIgDINIqwHqg");
	this.shape_11.setTransform(97.85,18.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("ABUBwQgYgOgOgcQgOgagBgkIAAgMQABgkANgbQANgcAZgPQAYgPAgAAQAfAAAZAPQAYAOAOAcQANAbAAAkIAAALQAAAjgNAcQgOAbgYAPQgZAPgfAAQgfAAgYgOgABcgMIAAASQAAAjAMATQALAUAYAAQAWAAANgUQAMgSAAgkIAAgKQAAglgMgTQgMgTgXAAQgtAAgCBDgAK5B7IAAj1IBQAAQAhAAAZAPQAaAPAPAbQAOAbABAhIAAALQAAAggPAcQgOAagZAPQgaAPggABgAL1BNIAUAAQAaAAANgRQAOgTABgjIAAgKQgBgkgOgSQgNgSgaAAIgUAAgAH5B7IAAj1ICpAAIAAAuIhvAAIAAA0IBeAAIAAAqIheAAIAAA7IBuAAIAAAugAFUB7IhTj1IBCAAIAxCyIAxiyIBCAAIhSD1gAgzB7IgrhXIghAAIAABXIg6AAIAAj1IBgAAQAsAAAYAUQAYATABAjQAAAagKARQgLAPgWALIAzBkIAAACgAh/gJIAmAAQARAAAIgJQAJgJAAgPQAAgQgJgJQgIgJgRAAIgmAAgAmaB7IAAj1IBiAAQAcAAAVALQAXAKALATQAMATAAAZQAAAkgaAUQgZAVgtAAIgmAAIAABUgAlfgFIAnAAQAQAAAKgJQAJgIAAgQQAAgRgJgKQgKgLgPAAIgoAAgAp7B7IAAj1IBiAAQAcAAAVALQAXAKALATQAMATAAAZQAAAkgaAUQgZAVgtAAIgmAAIAABUgApAgFIAnAAQAQAAAKgJQAJgIAAgQQAAgRgJgKQgKgLgPAAIgoAAgArNB7IgOguIhRAAIgOAuIg/AAIBaj1IA3AAIBbD1gAseAfIA1AAIgahUg");
	this.shape_12.setTransform(98.7059,100.4614,0.8366,0.8366);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#216B46").ss(2,1,1).p("AvWlcIPMK5IPhq5g");
	this.shape_13.setTransform(98.275,34.925);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#61E6A8").s().p("AvWlcIetAAIvhK5g");
	this.shape_14.setTransform(98.275,34.925);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#216B46").ss(2,1,1).p("AvXreIevAAIAAW9I+vAAg");
	this.shape_15.setTransform(98.375,73.5);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#58D199").s().p("AvXLfIAA29IevAAIAAW9g");
	this.shape_16.setTransform(98.375,73.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol14, new cjs.Rectangle(-1,-33.7,198.8,181.7), null);


(lib.Symbol13 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFA580").s().p("AhRBRQghgiAAgvQAAgvAhgiQAighAvAAQAwAAAiAhQAhAiAAAvQAAAvghAiQgiAigwAAQgvAAgigig");
	this.shape.setTransform(268.875,11.525);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CFF0D5").s().p("AhRBSQghgiAAgwQAAgvAhgiQAighAvAAQAvAAAiAhQAiAiAAAvQAAAwgiAiQgiAhgvAAQgvAAgighg");
	this.shape_1.setTransform(11.525,148.975);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#CFF0D5").s().p("AhQBSQgigiAAgwQAAgvAighQAigiAuAAQAwAAAiAiQAhAhAAAvQAAAwghAiQgiAhgwAAQguAAgighg");
	this.shape_2.setTransform(385.75,292.475);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol13, new cjs.Rectangle(0,0,397.3,304), null);


(lib.Symbol12 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,0,0,4).p("EgiJAB1ICyixQA4g3BOAAQBPAAA4A3IArAsQA4A3BPAAQBOAAA4g3IArgsQA4g3BPAAQBOAAA4A3IAsAsQA3A3BPAAQBPAAA3g3IAsgsQA4g3BPAAQBOAAA4A3IArAsQA4A3BPAAQBOAAA4g3IAsgsQA3g3BOAAQBPAAA3A3IAsAsQA4A3BOAAQBPAAA4g3IArgsQA4g3BPAAQBOAAA4A3IAsAsQA3A3BPAAQBPAAA3g3IAsgsQA4g3BOAAQBPAAA4A3IArAsQA4A3BPAAQBOAAA4g3IAsgsQA3g3BPAAQBPAAA3A3ICyCx");
	this.shape.setTransform(218.625,11.6018);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol12, new cjs.Rectangle(-1,-1,439.3,25.4), null);


(lib.Symbol11 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#C1E9FF").ss(18,0,0,4).p("EgiJACCICyixQA4g4BOAAQBPAAA4A4IArAsQA4A2BPAAQBOAAA4g2IArgsQA4g4BPAAQBOAAA4A4IAsAsQA3A2BPAAQBPAAA3g2IAsgsQA4g4BPAAQBOAAA4A4IArAsQA4A2BPAAQBOAAA4g2IAsgsQA3g4BOAAQBPAAA3A4IAsAsQA4A2BOAAQBPAAA4g2IArgsQA4g4BPAAQBOAAA4A4IAsAsQA3A2BPAAQBPAAA3g2IAsgsQA4g4BOAAQBPAAA4A4IArAsQA4A2BPAAQBOAAA4g2IAsgsQA3g4BPAAQBPAAA3A4ICyCx");
	this.shape.setTransform(218.625,10.357);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol11, new cjs.Rectangle(-9,-9,455.3,41.4), null);


(lib.Symbol10 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,0,0,4).p("EggsAQNIjMnOILvAAIAA5DIWVAAIAAbGMAl1AAAIAAEM");
	this.shape.setTransform(229.6745,102.8527);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FD847A").s().p("AhqBiIAAjDIDVAAIAADDg");
	this.shape_1.setTransform(183.275,149.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FD847A").s().p("AhqBiIAAjDIDVAAIAADDg");
	this.shape_2.setTransform(150.125,149.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FD847A").s().p("AhqBiIAAjDIDVAAIAADDg");
	this.shape_3.setTransform(114.425,149.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FD847A").s().p("AmCFjIAArFIMFAAIAALFg");
	this.shape_4.setTransform(144.6,63.275);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("ANpPxIhFhFQg4g3hOgBQhPABg4A3IglAmQg4A4hPAAQhOAAg4g4IgmgmQg3g3hPgBQhOABg3A3IgmAmQg4A4hOAAQhPAAg4g4IglgmQg4g3hOgBQhPABg4A3IglAmQg4A4hOAAQhPAAg4g4IglgmQg4g3hPgBQhOABg4A3IgmAmQg3A4hPAAQhPAAg3g4IhIhHQgogpg6ABQg6ACgmArQguA1hGgJQhFgHghg+IjMm+ILwAAIAA3hIUnAAIAAZLMAnYAAAIAAECQAABehWAkQhWAkhDhCQgpgpg6AAQg6AAgpApIhJBJQg3A4hPAAQhPAAg3g4IgmgmQg3g3hPgBQhPABg3A3IhGBFQg4A4hOAAQhPAAg4g4g");
	this.shape_5.setTransform(231.125,120.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol10, new cjs.Rectangle(-2.2,-1.5,463.9,228.3), null);


(lib.Symbol8 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AAUAwQgEgBgCgEIgrhLQgDgEABgDQACgEADgCQADgCAFABQADABACADIArBLQADAEgCAEQAAADgEACQgCACgDAAIgCAAg");
	this.shape.setTransform(21.2813,20.3892,0.7022,0.7022);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AAUAwQgEgCgCgDIgshLQgEgJAIgFQAIgEAFAIIAsBLQACAEgBAEQgBADgEACQgCACgDAAIgCAAg");
	this.shape_1.setTransform(24.3867,18.5789,0.7022,0.7022);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AAUAwQgEgBgCgEIgrhMQgCgDABgEQABgEADgCQAEgCADABQAEABACAEIAsBLQACAEgBAEQgBAEgEACIgFABIgCAAg");
	this.shape_2.setTransform(27.4961,16.7919,0.7022,0.7022);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(1.9,1,1).p("Ag1B8QgFgCgQgJQgTgLgNgGQgtgRgMgHQgNgHgDgOQgEgMAFgLQAGgMAMgFQATgGAUAFQALACAPAGIAPAGQADACAFACQACAAgEgEQgXgbgMgNIgUgVQgOgPgKgJQgMgNgNgQQgQgTgCgZQAHgUAUgCQAWADAPAOQAWARAPAVQARAUAdAjQgQgZgDgJQgFgOAKgMQAIgJALgEQAMgEAMAFQATAQAMAUQgLgUgDgUQABgKAHgJQALgJAMgEQAMgCAJAEQARAOANASQgEgJABgLQgDgPALgJQALgKAPAFQAOAEACAPIAdAyQAJASAIAYQAEASgCAXQgFAaADAcQADANAHALQAGAKAJAJQgLAHgRAIQgKAEgagPQgFgDgFADQgGADABAGQAAAfgJAHQgJAGgWANQgbAOgMAHQgJgYgOgDIgmgJg");
	this.shape_3.setTransform(19.6661,17.1624,0.7022,0.7022);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAQCQIglgJIgggLIgVgLIgfgRQgugRgMgHQgNgHgDgOQgEgMAGgLQAFgMAMgFQATgGAUAFQALACAPAGIAPAGIAIAEQABAAAAAAQAAAAAAgBQgBAAAAgBQgBgBgBgBIgjgoIgUgVIgYgYQgMgNgMgQQgRgTgBgZQAGgUAUgCQAXADAPAOQAVARAQAVIAuA3QgRgZgCgJQgGgOAKgMQAJgJAKgEQAMgEAMAFQATAQAMAUQgLgUgDgUQABgKAHgJQALgJAMgEQAMgCAJAEQASAOAMASQgEgJABgLQgDgPALgJQAMgKAOAFQAOAEACAPIAdAyQAJASAIAYQAEASgBAXQgHAaADAcQAFANAGALQAGAKAIAJQgKAHgRAIQgKAEgagPQgGgDgEADQgGADABAGQAAAfgJAHQgJAGgWANIgnAVQgIgYgPgDg");
	this.shape_4.setTransform(19.6661,17.1624,0.7022,0.7022);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol8, new cjs.Rectangle(4.9,4.1,29.6,26.1), null);


(lib.Symbol7 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#D7CDF3").s().p("AgxB4QgRgEgEgRIgxi2QgFgQANgMQAMgNAQAFIC2AxQARAEAEARQAEARgMAMIiECEQgJAJgMAAIgIgBg");
	this.shape.setTransform(48.6766,-155.1121,0.9999,0.9999,45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFA580").s().p("AhjBlQgqgqAAg7QAAg6AqgqQApgpA6AAQA7AAApApQAqAqAAA6QAAA7gqAqQgpApg7AAQg6AAgpgpg");
	this.shape_1.setTransform(273.75,241.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#A1E3AB").s().p("AhBB0QgyAAAAgyIAAiDQAAgyAyAAICDAAQAyAAAAAyIAACDQAAAygyAAg");
	this.shape_2.setTransform(526.4395,216.8323,1,1,44.9994);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol7, new cjs.Rectangle(36.2,-170.9,504.90000000000003,426.20000000000005), null);


(lib.Symbol4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#917347").s().p("AgcBTQgFAAgDgEQgDgDAAgFIAeiRQABgIAIAAQAIAAACAIIAdCRQABAFgDADQgDAEgFAAg");
	this.shape.setTransform(33.7575,40.075);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#60B10F").s().p("ABMBVIhMhMIhMBMQgFAFgHgDQgHgEACgHIAQhOIg8AqQgFAEgHgEQgGgEACgHQAGgmAZgfQAZgfAkgQQAFgCAFADIAzAlIA0glQAFgDAFACQAkAQAZAfQAZAfAHAmQABAHgGAEQgHAEgFgEIg8gqIAQBOQABAHgGAEIgGABQgDAAgEgDgAAIgNIA7A7IgOhGQgCgHAGgEQAGgEAGAEIA5AoQgHgQgMgQQgUgZgcgNIg1AlQgGAFgFgFIg1glQgcANgUAZQgMAQgHAQIA5goQAGgEAGAEQAGAEgCAHIgOBGIA7g7QADgDAEAAQAEAAAEADg");
	this.shape_1.setTransform(33.75,28.0531);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#60B10F").s().p("AAAgFIhSBTIAUhoIhRA5QAGgkAXgcQAXgdAigPIA5AoIA6goQAhAPAYAdQAXAcAHAkIhSg5IAUBog");
	this.shape_2.setTransform(33.75,28.05);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AjtFRQgpAAgdgdQgegdAAgqIAAnZQAAgpAegeQAdgdApAAIHaAAQAqAAAdAdQAdAeAAApIAAHZQAAAqgdAdQgdAdgqAAg");
	this.shape_3.setTransform(33.75,33.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(0,0,67.5,67.5), null);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#409BF9").s().p("Ah9B+Ig5gSIASgVIA3AAQAQgYATgZQAUgbAKgJIAIgHIAOgOIgDgDIiGhyIAcgUIAkANIAGgKIAIAAQAJACAFAIIgCAJIApAPQACgGAGgIIAIABQAJACAEAIIgDANIAqAPIACABIAFgGIACgCQAVgZAhgbQAtgkAQAJQAFADAFAEQAFAGACAEQAJAQgkAtQgbAhgZAVIgIAHIABACIAQAqIAIgDIAEAAQANAHgCAOQgIAGgGACIAPApIAJgCQANAIgDAOQgEADgGADIAOAkIgVAdIhyiHIgDgCIgVAVQgJAKgaAUQgaAUgYAPIAAA3IgVASg");
	this.shape.setTransform(41.239,41.2188);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgZGWQidAAhvhwQhwhvAAidIAAgzQAAidBwhvQBvhwCdAAIAzAAQCdAABvBwQBwBvAACdIAAAzQAACdhwBvQhvBwidAAg");
	this.shape_1.setTransform(40.575,40.575);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0,0,81.2,81.2), null);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#91AFCD").s().p("AiHAVQgJAAgGgGQgGgGAAgJIAAAAQAAgIAGgGQAGgGAJAAIEPAAQAIAAAHAGQAFAGABAIIAAAAQgBAJgFAGQgHAGgIAAg");
	this.shape.setTransform(33.8,24.375);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#91AFCD").s().p("AgeAVQgJAAgHgGQgFgHgBgIQABgHAFgHQAHgGAJAAIA+AAQAIAAAGAGQAHAHAAAHQAAAIgHAHQgGAGgIAAg");
	this.shape_1.setTransform(33.8,20.2);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#E78972").s().p("AhpBGQgHgFgCgJQgCgIAFgHIAqg+QAGgJALAAQAGAAAEACIBDAhIA0hFQAGgIALAAQAHAAAFAEQAHAFACAJQABAIgFAHIg/BTQgHAIgKAAQgFAAgEgCIhCghIggAvQgGAJgLAAQgHAAgFgDg");
	this.shape_2.setTransform(33.8125,35.875);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#91AFCD").s().p("AhyCTQgRAAgNgNQgMgMAAgSIAAjPQAAAIAGAGQAGAGAJAAIAAC7QAAAJAGAHQAHAFAIABIDlAAQAJgBAGgFQAGgHAAgJIAAi7QAIAAAHgGQAFgGABgIIAADPQAAASgNAMQgLANgSAAgACXh3QgHgFgIAAIhoAAQAIgBAGgFQAHgHAAgJIA+AAQARAAAMANQAMAMABARQgBgJgFgGgAiQiFQANgNARAAIA+AAQABAJAFAHQAHAFAIABIhoAAQgJAAgGAFQgGAGAAAIQAAgQAMgMg");
	this.shape_3.setTransform(33.8,34.85);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AhyBpQgIAAgHgGQgGgHAAgIIAAi8IEPAAIAAC8QAAAIgGAHQgGAGgJAAgAhFgfIgpA9QgGAHACAJQACAIAHAFQAGAEAGAAQALAAAGgJIAggwIBCAiQAEACAGAAQAJAAAHgIIA/hTQAGgHgCgJQgBgIgIgFQgEgFgIAAQgLAAgFAJIg1BFIhDgiQgEgCgGAAQgKAAgHAKg");
	this.shape_4.setTransform(33.8,36.925);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AjtFRQgpAAgdgdQgdgdgBgqIAAnZQABgpAdgeQAdgdApAAIHaAAQAqAAAdAdQAeAegBApIAAHZQABAqgeAdQgdAdgqAAg");
	this.shape_5.setTransform(33.75,33.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,67.5,67.5), null);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AlKMPQiYhBh2h1Qh1h2hBiYQhDieAAitQAAisBDieQBBiYB1h2QB2h1CYhBQCehDCsAAQCtAACeBDQCYBBB2B1QB1B2BBCYQBDCeAACsQAACthDCeQhBCYh1B2Qh2B1iYBBQieBDitAAQisAAiehDgAknq7QiIA6hpBpQhpBpg6CIQg8CNAACaQAACaA8COQA6CIBpBpQBpBpCIA6QCNA8CaAAQCaAACOg8QCIg6BphpQBphpA6iIQA8iOAAiaQAAiag8iNQg6iIhphpQhphpiIg6QiOg8iaAAQiaAAiNA8g");
	this.shape.setTransform(123.975,-5.825);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_4
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AnKGpQgGgHAFgHIKhtGID4A0IuKMgQgDADgEAAQgDAAgEgDg");
	this.shape_1.setTransform(49.024,101.969);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	// Layer_3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AhpLlQiRg9hvhvQhvhvg9iRQhAiWAAijQAAijBAiVQA9iRBvhvQBvhvCRg9QCUhACkAAQCjAACWBAQCRA9BvBvQBvBvA9CRQBACVAACjQAACkhACVQg9CRhvBvQhvBviRA9QiVBAikAAQikAAiUhAg");
	mask.setTransform(101.175,-3.375);

	// Layer_5
	this.instance = new lib.tylernixPQeoQdkU9jQunsplash1();
	this.instance.setTransform(39,-137,0.2552,0.2552);

	var maskedShapeInstanceList = [this.instance];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(2.8,-90.8,206.2,235.60000000000002), null);


(lib.shkala = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#00D0DB").s().p("AhCAMIAAgXICFAAIAAAXg");
	this.shape.setTransform(6.65,29.975);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#9DF9FD").s().p("AhCCQIAAkfICFAAIAAEfg");
	this.shape_1.setTransform(6.65,14.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.shkala, new cjs.Rectangle(0,0,13.3,31.2), null);


(lib.Symbol9 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,0,0,4).p("AAAzwMAAAAnh");
	this.shape.setTransform(62,140.975);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(100));

	// Layer_4
	this.instance = new lib.Symbol11();
	this.instance.setTransform(292.5,407.45,1,1,0,0,0,218.6,11.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:330},49,cjs.Ease.cubicInOut).to({x:292.5},50,cjs.Ease.cubicInOut).wait(1));

	// Layer_5
	this.instance_1 = new lib.Symbol12();
	this.instance_1.setTransform(289.5,436.45,1,1,0,0,0,218.6,11.7);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({x:252},49,cjs.Ease.cubicInOut).to({x:289.5},50).wait(1));

	// Layer_6
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFF1CE").s().p("Ap3rYITvLYIzvLag");
	this.shape_1.setTransform(126.425,89.5);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(100));

	// Layer_7
	this.instance_2 = new lib.Symbol13();
	this.instance_2.setTransform(198.6,152,1,1,0,0,0,198.6,152);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(100));

	// Layer_10
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#D7CDF3").s().p("AlhFiQiSiTAAjPQAAjOCSiTQCTiSDOAAQDPAACTCSQCSCTAADOQAADPiSCTQiTCSjPAAQjOAAiTiSg");
	this.shape_2.setTransform(492.75,259.475);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(100));

	// Layer_11
	this.instance_3 = new lib.Symbol10();
	this.instance_3.setTransform(276.85,274.3,1,1,0,0,0,229.7,112.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({regX:229.8,regY:112.7,rotation:0.2649,x:276.9,y:254.35},49,cjs.Ease.cubicInOut).to({regX:229.7,regY:112.6,rotation:0,x:276.85,y:274.3},50,cjs.Ease.cubicInOut).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.2,0,576.9000000000001,449.1);


(lib.ClipGroup = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_114 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(114).call(this.frame_114).wait(1));

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#DBE1E9").s().p("AHxCQIAAkfIAKAAIAAEfgAFhCQIAAkfIAKAAIAAEfgADSCQIAAkfIAKAAIAAEfgABDCQIAAkfIAKAAIAAEfgAhMCQIAAkfIAKAAIAAEfgAjbCQIAAkfIAKAAIAAEfgAlrCQIAAkfIAKAAIAAEfgAn6CQIAAkfIAKAAIAAEfg");
	this.shape.setTransform(190.5,82.7,1,1.0813,0,0,0,-0.5,-14.7);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#C9D4F8").s().p("AgbAdQgMgNAAgQQAAgPAMgMQAMgMAPAAQARAAAMAMQALAMAAAPQAAAQgLANQgMALgRAAQgPAAgMgLg");
	this.shape_1.setTransform(54.35,18.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#C9D4F8").s().p("AgbAdQgMgNAAgQQAAgPAMgMQALgMAQAAQAQAAAMAMQAMAMAAAPQAAAQgMANQgMALgQAAQgQAAgLgLg");
	this.shape_2.setTransform(42,18.9);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C9D4F8").s().p("AgbAdQgMgNAAgQQAAgPAMgMQALgMAQAAQARAAALAMQAMAMAAAPQAAAQgMANQgLALgRAAQgQAAgLgLg");
	this.shape_3.setTransform(29.65,18.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#E8ECF1").s().p("AApA0IgVgVQgNAJgOAAQgTAAgOgOQgNgOAAgSQAAgUANgNQAOgOATAAQATAAAOAOQANANAAAUQAAAOgJAMIAVAVQAGAGgGAFQgCACgDAAQgCAAgDgCgAgegdQgJAJAAAOQAAAMAJAKQAKAJANAAQANAAAJgJQAKgKAAgMQAAgOgKgJQgJgKgNAAQgNAAgKAKg");
	this.shape_4.setTransform(96.5625,55.4625);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#E8ECF1").s().p("Al1BaIAAizILrAAIAACzgAlrBQILXAAIAAifIrXAAg");
	this.shape_5.setTransform(69.525,55.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#000000").s().p("AiIAwQgEgBgEgDIgGgFIAFgGQACADAFAEIAHABQAFAAADgCQADgBACgEQACgCAAgGIAAgEQgDADgDABQgFADgEAAQgEAAgFgDQgDgCgEgDIgEgJQgBgFAAgGIAAgBIABgKIAEgJQAEgEADgBQAEgCAFAAQAFAAAEACQAEACACADIAAAAIAAgGIAJAAIAAAzQAAAHgDAFQgDAFgFADQgFADgHAAgAiHgQQgEABgBADIgCAGIgBAGIAAABIABAHIACAHIAFAEQACABAEABQAFAAACgCIAFgGIABgBIAAgWIgDgEIgEgDIgGgCQgEAAgCADgAhjAmIADgFIABgEIABgNIAJAAIAAAIQAAAFgCAEQgDAFgEADgAEeAaQgFgCgCgDQgEgDgBgFIgCgKIAAgCQAAgFACgGQACgGADgDIAIgFQADgCAFAAQAGAAAEACQAFADACACQADAFABAEQABAEAAAGIAAADIgkAAIABAHQABAEACABIAFAFQADABAEAAQADAAAFgCIAGgGIAFAFIgEAFIgGAEQgFACgFAAQgEAAgGgDgAEigRQgDABgCADQgCADgBADIAAAEIAaAAIAAgBIgBgHIgEgFQgDgDgFAAQgDAAgCACgAC4AaQgFgCgDgDIgFgIQgCgFAAgFIAAgCQAAgHACgEIAFgJIAIgFQAEgCAFAAQAGAAADACQAGACABADQADAEABAFQACAEAAAGIAAADIglAAIACAHQABAEACABIAFAFQADABADAAQAEAAAEgCQAEgDACgDIAGAFIgFAFQgCADgEABQgEACgFAAQgEAAgGgDgAC7gRIgFAEIgCAGIgBAEIAaAAIAAgBIgBgHQgBgDgDgCQgCgDgFAAIgGACgABKAaQgEgBgDgEQgDgEgCgFQgBgFAAgFIAAgCQAAgFABgFQACgEADgEQADgEAEgCQAEgCAHAAQAFAAAGADQAEACADAFQADAEAAAGIgJAAIgCgGQgBgDgDgCQgCgCgEAAQgFAAgCACQgDACgCADIgCAGIgBAGIAAACIABAGQABAFABABQACADACACQADACAFAAIAGgBIAEgEIACgFIAJAAQAAAEgDAFQgDADgFADQgFADgFAAQgGAAgFgDgAj8AaQgEgCgDgDIgFgJQgCgFAAgGIAAgBQAAgFACgFQABgFAEgDQADgEAEgCQAEgCAGAAQAGAAAEACQAGACACAEQADADACAFQACAFAAAFIAAABQAAAGgCAFIgFAJQgCADgGACQgFADgFAAQgEAAgGgDgAj4gRQgDACgCADQgCABgBAFIgBAGIAAABIABAIIADAGIAFAFQADABADAAQAFAAACgBIAFgFIADgGIABgIIAAgBIgBgGIgDgGIgFgFQgCgCgFAAQgDAAgDACgAD6AcIAAhMIAKAAIAABMgADiAcIAAhMIAJAAIAABMgACVAcIAAgiIgBgHIgEgEIgGgCQgDAAgDACIgFAEIgCADIAAAmIgJAAIAAhMIAJAAIAAAdQAEgEADgBQAEgCAFAAIAHABIAFADQADADABAEQABADAAAGIAAAigAAnAcIAAg1IAKAAIAAA1gAAOAcIABg6IgXA6IgHAAIgYg5IABA5IgJAAIAAhHIAMAAIAYA5IAWg5IAMAAIAABHgAitAcIAAgiIgBgHIgEgEIgGgCQgDAAgDACIgFAEIgCADIAAAmIgJAAIAAg1IAJAAIAAAGIAAAAQAEgDADgCQAEgCAFAAIAHABIAFADQADADABAEQABADAAAGIAAAigAk8AcIAAhHIAJAAIAAA/IAiAAIAAAIgAAogkQAAAAAAAAQgBgBAAAAQAAgBAAAAQAAAAAAgBQAAgBAAAAQAAgBAAAAQAAgBABAAQAAgBAAAAQAAAAABgBQAAAAABAAQAAAAABAAQABgBAAAAQABAAAAABQABAAAAAAQABAAAAAAQABABAAAAQABAAAAABQAAAAAAABQABAAAAABQAAAAAAABQAAABAAAAQAAAAgBABQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQgBAAAAAAQgBgBAAAAQgBAAAAgBg");
	this.shape_6.setTransform(67.475,163.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#000000").s().p("AhVAqIADgFIACgEIAAgNIAJAAIAAAHQAAAFgCAEQgDAGgDADgADSAdQgEgCgCgDQgCgEAAgEQAAgFACgCQABgDADgDIAIgDIATAAIAAgFIgBgFIgEgEIgGgBIgGABIgEADIgCAEIgJAAIACgGQAAgCAEgCIAGgEIAJgCQAHAAADADQAFABACAEQADAFAAAFIAAAeIACAFIAAAAIgKAAIgBgDIAAgCIgBACIgGADQgEABgEAAQgGAAgEgCgADcAGIgFACIgDACIgBAFQAAAAAAABQAAABABAAQAAABAAAAQAAABAAAAIAEADIAFACQAFAAADgCIAFgEIABgCIAAgLgAAsAdQgEgCgCgDQgDgEAAgEQAAgFACgCQABgDAEgDIAHgDIATAAIAAgFIgBgFIgEgEIgGgBIgGABIgEADIgBAEIgJAAIABgGQABgCADgCIAHgEIAJgCQAGAAAEADQAFABACAEQADAFAAAFIAAAeIABAFIAAAAIgJAAIgCgFIgBACIgGADQgDABgFAAQgFAAgEgCgAA2AGIgFACIgDACIgBAFQAAAAAAABQAAABAAAAQAAABAAAAQABABAAAAIADADIAGACQAEAAADgCIAFgEIABgCIAAgLgAjJAeQgFgCgDgDIgFgIQgBgFAAgGIAAgCQAAgHACgEQABgEAEgFIAHgFIAJgCQAGAAAEADQADAAAEAFQACACACAGIABAJIAAAFIgkAAIABAGIADAGIAFAEQADACAEAAQAEAAAEgDQADgBADgEIAFAEIgEAGIgHADQgDABgGAAQgFAAgFgBgAjGgOIgEAEIgDAGIgBAEIAbAAIAAAAIgCgIQgBgCgDgDQgCgCgFAAgAEjAeIAAgiQAAgEgBgCQAAgBgBAAQAAgBgBAAQAAgBgBAAQAAAAgBgBQgCgBgDAAQgEAAgDABIgEAFIgDADIAAAkIgJAAIAAhKIAJAAIAAAdIABgBIAGgEQAEgDAFAAIAHABQADABADADIADAGIABAJIAAAhgAC0AeIAAgiQAAgFgBgBIgDgEQgCgBgEAAQgEAAgCABIgFAFIgCACIAAAlIgJAAIAAg0IAIAAIAAAHIABgBQADgDAEgBQADgDAGAAIAHABQADACACACQADADAAADQACAEAAAFIAAAhgAB9AeIAAgiQAAgEgCgCQAAgBAAAAQgBgBAAAAQgBgBAAAAQgBAAAAgBQgCgBgEAAQgDAAgDABIgFAFIgCADIAAAkIgJAAIAAg0IAJAAIAAAHIAAgBQADgDAEgBQAEgDAFAAIAHABQACABADADIAEAGIABAJIAAAhgAAMAeIAAgfIgjAAIAAAfIgKAAIAAhGIAKAAIAAAfIAjAAIAAgfIAJAAIAABGgAhmAeIAAgiQAAgFgBgBIgEgEQgCgBgEAAQgDAAgDABIgFAFIgCACIAAAlIgJAAIAAg0IAJAAIAAAHIAAgBQAEgDADgBQAEgDAFAAIAHABIAFAEQADADABADQABAEAAAFIAAAhgAifAeIAAg0IAKAAIAAA0gAjtAeIAAhKIAJAAIAABKgAkAAeIgZggIgJAIIAAAYIgJAAIAAhGIAJAAIAAAjIAggjIALAAIgcAgIAfAmgAieggIgBgEIABgEQAAAAABAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQABAAAAAAIABAEIgBAEQAAAAgBABQAAAAgBAAQAAAAgBAAQAAAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQgBgBAAAAg");
	this.shape_7.setTransform(65.775,130.45);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#000000").s().p("AAHAqIADgFIACgEIAAgNIAJAAIAAAHQAAAEgCAFQgDAGgDADgAEPAeQgEgCgDgEQgEgDgBgFQgCgGAAgEIAAgCQAAgEACgHIAFgJQADgCAFgDQAEgBAEAAQAGAAAEACQAEABADAEQADADABAFIABAKIAAADIgkAAIABAHIADAGIAFAEIAHABQAFAAADgCIAGgFIAGAFIgFAEIgGAEQgEABgGABgAETgOIgFAEQgCACgBAFIAAADIAaAAIAAgBIgBgHIgEgFQgDgCgFAAgACDAeQgEgDgCgDQgCgEAAgEQAAgFABgDQACgEADgBQAEgDAEAAIAKgBIAJAAIAAgEQAAgDgCgDIgDgDQgDgCgEAAQgDAAgDACIgEADQAAAAAAABQgBAAAAABQAAAAAAABQAAAAAAABIgJAAIABgFIAEgGIAHgDIAJgBQAGAAAEACQAEABADAFQADAEAAAFIAAAYIAAAFQAAAEACACIAAABIgKAAIgBgFIAAgBIgCABIgGAEQgDABgEABQgGAAgEgCgACIAHIgDADIgBAFIABAEIADAEIAGABQAEgBADgBIAFgFIACgCIAAgKIgIAAgAhOAeQgEgCgDgEQgEgDgBgFQgCgEAAgGIAAgCQAAgEACgHIAFgJQADgCAFgDQAEgBAEAAQAGAAAEACQAEABADAEQADADABAFIABAKIAAADIgkAAIABAHIADAGIAFAEIAHABQAFAAADgCQADgCADgDIAFAFIgEAEIgGAEQgFABgFABQgFgBgFgBgAhKgOIgFAEQgCACgBAFIAAADIAaAAIAAgBIgBgHIgEgFQgDgCgFAAgAirAeQgEgDgCgDQgCgEAAgEQAAgFABgDQACgEADgBQAEgDAEAAIAKgBIAJAAIAAgEQAAgDgCgDIgDgDQgDgCgEAAIgGACIgEADQAAAAAAABQgBAAAAABQAAAAAAABQAAAAAAABIgJAAIABgFIAEgGIAHgDIAJgBQAGAAAEACQAEABADAFQADAEAAAFIAAAYIAAAFQAAAEACACIAAABIgKAAIgBgFIAAgBIgCABIgGAEQgDABgEABQgGAAgEgCgAihAGIgFABIgDADIgBAFIABAEIADAEIAGABQAEgBADgBIAFgFIACgCIAAgKIgIAAgAE6AfIAAhLIAJAAIAABLgADsAfIAAg0IAJAAIAAA0gADUAfIAAgiIgBgHIgEgEIgGgBQgDAAgDACIgFADIgCADIAAAmIgJAAIAAg0IAJAAIAAAGIAAgBQAEgEADAAQAEgCAFAAIAHABQADAAACADIAEAGQABACAAAHIAAAigAA7AfIAAhHIAVAAQAIAAAEACQAHAEADADQAEAEADAHQACAHAAAGIAAAFQAAAHgCAGQgDAGgEAFQgEAEgGACQgFADgIAAgABFAXIAKAAQAIAAAEgEQAFgCADgHQADgGAAgGIAAgFQAAgFgCgGQgBgEgDgEQgCgDgFgBQgEgCgFAAIgLAAgAgnAfIAAgHIAegmIgdAAIAAgHIAnAAIAAAGIgcAmIAeAAIAAAIgAh7AfIAAg0IAJAAIAAAFIAFgFQADgBAFAAIACAAIACAAIAAAJIgCgBIgDAAIgFABIgEADIgDAEIAAAlgAjUAfIgTg0IAJAAIAOAnIANgnIAJAAIgTA0gAj6AfIAAhLIAJAAIAABLgAkMAfIgHgTIgfAAIgGATIgKAAIAbhHIAJAAIAbBHgAkvAEIAZAAIgMghgADsggQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAAAgBQAAAAABgBQAAAAAAAAQABgBAAAAQABAAAAgBQABAAAAAAQABAAAAAAQABAAAAAAQABAAAAAAQABABAAAAQABAAAAABQABAAAAAAQAAABAAAAQABABAAAAQAAABAAAAQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQAAAAgBAAQAAABgBAAQAAAAgBgBQAAAAgBAAQAAAAgBAAQAAgBgBAAg");
	this.shape_8.setTransform(67.325,97.9);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#788EA8").s().p("AD9AsIgIgDQgEgEgBgEQgDgFgBgFQgBgHgBgIIAAgMQABgMABgFQACgHAEgFQADgEAGgCIAKgCIAJABQAGACACACQADACACAFQAEAFAAAFQABAGAAAJIAAAMQAAALgBAGQgCAHgEAFQgDAEgGACQgDACgIAAgAD+gfIgEAEQgDADgBAGIAAAmIACAHIAEAGQABACADAAIAFABQAFABADgCIAEgEQADgFABgEIABgNIgBgZIgCgIIgEgEQgBgCgDgBIgGgCQgEAAgDACgAAxArQgGgCgEgEQgDgFgCgFQgCgHgBgFIAAgCQAAgIADgGQACgGAEgDQAEgEAFgDQAEgCAHAAQAHAAAEACQADACAGAFIAEAJQABAFAAAHIAAAFIgqAAIABAIQAAACADAFQADACAEACIAIABQAFAAAEgBQAEgDADgEIAGAFQgBADgDADQgDADgFABQgEACgHAAQgHAAgFgCgAA1gJIgGAFQgDAEAAACIgBAFIAfAAIAAgBIgBgHQgCgEgDgDQgDgDgFABQgFgBgCACgAgOArQgEgBgDgFIgBAAIAAAHIgKAAIAAhZIALAAIAAAiQADgEAEgCQAFgCAGAAQAFAAAFACQAEADAEAEQACAEACAGQACAHAAAFIAAACIgCAMQgCAGgCAEIgIAHQgGADgEgBQgGAAgFgCgAgNgJIgFAEIgDAFIAAAaIABABQACAFADACQAEADAFgBQAEAAADgBIAFgGQACgDABgEIABgIIAAgCIgBgJIgDgGQgBgDgEgCQgCgCgFAAQgEAAgDABgAi7ArIgJgGQgDgFgDgFQgCgFAAgHIAAgCQAAgJACgFQAEgHADgCQADgEAGgDQAEgCAGAAQAHAAAFACQAEADAEAEIAFAJQABAFAAAHIAAAFIgrAAIACAIIADAHQADACADACIAIABQAGAAAEgBIAHgHIAGAFQgCAEgDACQgDADgEABQgFACgHAAQgHAAgFgCgAi2gJIgGAFQgCACgBAEIgBAFIAfAAIAAgBIgBgHQgBgEgEgDQgEgDgFABQgEgBgCACgAj7ArQgEgCgFgFQgDgFgCgFQgCgFAAgHIAAgDQAAgHACgEQACgGADgEQAFgFAEgCQAFgCAIAAQAHAAAGADQAGADADAFQADAGAAAEIgLAAQABgDgCgCIgGgGIgHgBQgEAAgFABQgDACgCAEIgCAGIgCAIIAAADIACAIIACAHQADAFACABQADABAGAAQAEABADgCQAEgCACgCQACgDgBgDIALAAQAAAEgDAGQgFAFgFADQgFACgHAAQgHABgGgDgAk5ArIgJgGQgEgFgCgFQgCgFAAgHIAAgCQAAgIACgGQADgGADgDQAEgEAFgDQAEgCAGAAQAIAAAFACQAEACADAFIAFAJQACAFAAAHIAAAFIgrAAIABAIIAEAHQACACAEACIAHABQAHAAAEgBIAGgHIAHAFIgFAGIgIAEQgEACgHAAQgIAAgEgCgAk1gJIgFAFQgCACgCAEIgBAFIAgAAIAAgBIgCgHQgBgEgEgDQgDgDgGABQgDgBgDACgAGLAsIAAhHIgWAIIAAgJIAfgMIABAAIAABUgAEvAsIAAgIIAkgnIAEgHIAAgHQABgEgCgEQgCgEgEgBQgDgDgFAAQgFAAgEADQgDACgCAEQgCAFAAAEIgLAAQAAgHADgGQADgGAHgDQAFgEAJAAQAIAAAHADQAEACAEAGQADAFAAAGIgBAIIgDAIIgjAmIAsAAIAAAJgACoAsIAAgIIAkgnIAEgHIAAgHQABgEgCgEQgCgEgEgBQgDgDgFAAQgFAAgEADQgDACgCAEQgCAFAAAEIgLAAQAAgHADgGQADgGAHgDQAFgEAJAAQAIAAAHADQAEACAEAGQADAFAAAGIgBAIIgDAIIgjAmIAsAAIAAAJgABiAsIAAg+IAKAAIABAHIAAAAIAGgGQADgCAGAAIACAAIADAAIgBAKIgCAAIgCAAQgEAAgDABQgDABgCADQgCACgBACIAAAsgAg7AsIAAgqQAAgEgCgCQgCgEgCgBIgHgBIgHABIgEADQgDADgBACIgBAFIAAAoIgKAAIAAgqQAAgDgCgDQgCgEgDgBQgCgBgFAAQgEAAgEABIgFAGIgBADIAAAsIgLAAIAAg+IAKAAIAAAHQADgDAFgDQAEgCAHAAIAJABQAEACACACIADAFIACgCQADgDAFgDQAEgCAGAAIAJABQAFACACADQADACABAEIABAJIAAAqgAmUAsIAAhUIAYAAQAIAAAHADQAGACAGAGQAFAFADAHQACAJABAIIAAAEQgBAIgCAJQgDAIgFAFQgFAFgHADQgHACgJAAgAmJAjIAMAAQAJAAAGgDQAGgFADgHQAEgHAAgJIAAgEQgBgFgCgIQgBgEgDgFQgFgFgEgBQgEgCgHAAIgNAAg");
	this.shape_9.setTransform(295.6,55.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#788EA8").s().p("AD/AsIgHgDQgEgEgCgEQgDgFAAgFQgCgHAAgIIAAgMQAAgMACgFQACgIADgEQAEgEAFgCIALgCIAJABQAFACACACQAEACACAFQADADABAHIABAbQAAALgCAGQgBAHgEAFQgDAEgGACQgEACgHAAgAEBgfIgFAEIgDAJIAAAmIACAHIADAGIAFACIAFABQAEABADgCIAFgEQADgFAAgEIABgNIgBgZIgBgIIgEgEQgCgCgDgBIgFgCQgEAAgDACgAA0ArIgKgGQgFgFgBgFQgCgGAAgGIAAgCQAAgIACgGQADgGAEgDQAEgEAFgDQAEgCAGAAQAHAAAEACQAEACAFAFIAFAJQABAFAAAHIAAAFIgrAAIABAIQABACADAFQACACAEACIAIABQAGAAADgBQAFgDACgEIAHAFQgCADgDADQgDADgFABQgEACgHAAQgHAAgEgCgAA3gJIgFAFQgDAEgBACIgBAFIAgAAIAAgBIgBgHQgCgEgDgDQgEgDgFABQgEgBgDACgAgLArQgFgBgCgFIgBAAIAAAHIgKAAIAAhZIALAAIAAAiQACgEAFgCQAEgCAGAAQAGAAAEACQAEADAEAEQADAEACAGQACAEAAAIIAAACQAAAGgCAGQgCAGgDAEQgEAFgEACQgFADgFgBQgGAAgEgCgAgKgJIgGAEIgCAFIAAAZIAAACQACAFAEACQAEADAFgBQADAAAEgBQADgCABgEQADgDAAgEIACgIIAAgCIgCgJIgDgGQgBgDgDgCQgDgCgEAAQgEAAgDABgAi4ArIgJgGQgEgFgCgFQgCgFAAgHIAAgCQAAgKADgEQACgGAEgDQADgEAGgDQADgCAHAAQAHAAAEACQAFADAEAEIAFAJQABAFAAAHIAAAFIgrAAIABAIIAEAHQACACADACIAIABQAHAAADgBIAIgHIAGAFQgDAEgCACQgDADgFABQgEACgHAAQgIAAgEgCgAi0gJIgGAFQgBACgCAEIgBAFIAgAAIAAgBIgCgHQgBgEgDgDQgEgDgFABQgEgBgDACgAk1ArQgEgCgFgFQgDgEgDgGIgCgMIAAgCQAAgFACgHQADgFADgFQADgEAGgDQAFgCAHAAQAIAAAEACQAGADADAEQAEAFACAFQACAHAAAFIAAACIgCAMQgCAGgEAEQgEAFgFACQgGADgGgBQgGABgGgDgAkxgJIgFAGIgEAGIgBAJIAAACIABAJIAEAGIAFAGIAIABQAEABAEgCIAGgGIADgGIABgJIAAgCIgBgJIgDgGIgGgGQgEgBgEAAIgIABgAGNAsIAAhHIgVAIIAAgJIAegMIACAAIAABUgAExAsIAAgIIAkgnIAEgHIABgHQAAgEgCgEQgCgEgCgBQgEgDgFAAQgGAAgDADQgDACgDAEQgCAFAAAEIgKAAQAAgHACgGQADgGAHgDQAGgEAJAAQAIAAAGADQAGACADAGQADAFAAAGIgBAIIgEAIIgiAmIArAAIAAAJgACqAsIAAgIIAkgnIAEgHIABgHQAAgEgCgEQgCgEgCgBQgEgDgFAAQgGAAgDADQgDACgDAEQgCAFAAAEIgKAAQAAgHACgGQADgFAHgEQAGgEAJAAQAIAAAGADQAGACADAGQADAFAAAGIgBAIIgEAIIgiAmIArAAIAAAJgABkAsIAAg+IALAAIAAAHIABAAIAFgGQAEgCAFAAIADAAIADAAIAAAKIgEAAIgCAAQgEAAgDABQgCABgCADQgDACAAACIAAAsgAg4AsIAAgqQAAgEgCgCQgCgEgDgBIgHgBIgGABIgFADQgDADAAACIgBAFIAAAoIgLAAIAAgqQAAgEgCgCQgBgEgDgBQgDgBgEAAQgFAAgDABQgDABgDAFIgBADIAAAsIgLAAIAAg+IAKAAIABAHQACgDAFgDQAEgCAHAAIAJABQAEACACACIAEAFIACgCQADgEAEgCQAFgCAGAAIAJABQAEACACADQAEACABAEQABAFAAAEIAAAqgAjvAsIgXg+IALAAIAQAwIAQgwIALAAIgXA+gAlhAsIgrhAIAABAIgLAAIAAhUIALAAIAsBBIAAhBIAKAAIAABUg");
	this.shape_10.setTransform(165.75,55.05);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#C3CCDB").s().p("A5wAFIAAgJMAzhAAAIAAAJg");
	this.shape_11.setTransform(190.675,40);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#C3CCDB").s().p("A5wAFIAAgJMAzhAAAIAAAJg");
	this.shape_12.setTransform(190.75,71.95);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#C3CCDB").s().p("AgECgIAAk/IAJAAIAAE/g");
	this.shape_13.setTransform(356.05,55.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#C3CCDB").s().p("AgECgIAAk/IAJAAIAAE/g");
	this.shape_14.setTransform(26.35,55.475);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#C3CCDB").s().p("AgECgIAAk/IAJAAIAAE/g");
	this.shape_15.setTransform(112.35,55.475);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#C3CCDB").s().p("AgECgIAAk/IAJAAIAAE/g");
	this.shape_16.setTransform(227.2,55.475);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#FFFFFF").s().p("AmuCgIAAk/INdAAIAAE/g");
	this.shape_17.setTransform(68.9,55.475);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#F8F5FC").s().p("AzBCgIAAk/MAmEAAAIAAE/g");
	this.shape_18.setTransform(233.8,55.475);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#DBE1E9").s().p("A5wAFIAAgJMAzgAAAIAAAJg");
	this.shape_19.setTransform(190.5,275.95);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#DBE1E9").s().p("A5wAFIAAgJIPtAAIAAAEICOAAIAAgEMAhlAAAIAAAJg");
	this.shape_20.setTransform(190.5,243.7);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#00AE53").s().p("AhGACIAAgDICNAAIAAADg");
	this.shape_21.setTransform(133.2,243.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#9DE0BB").s().p("AhGADIAAgFICNAAIAAAFg");
	this.shape_22.setTransform(133.2,211.6);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#DBE1E9").s().p("An1AFIAAgFIiOAAIAAAFIvtAAIAAgJMAzgAAAIAAAJg");
	this.shape_23.setTransform(190.5,211.4);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#DBE1E9").s().p("A5wAFIAAgJMAzgAAAIAAAJg");
	this.shape_24.setTransform(190.5,179.15);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#00AE53").s().p("AhHAFIAAgJICOAAIAAAJg");
	this.shape_25.setTransform(276.55,146.9);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#DBE1E9").s().p("AzCAFIAAgJMAmFAAAIAAAJg");
	this.shape_26.setTransform(147.525,146.9);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#CBDAE7").s().p("AkdAEIAAgHII7AAIAAAHg");
	this.shape_27.setTransform(326.7,147.025);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#DBE1E9").s().p("AllAFIAAgJILLAAIAAACIo8AAIAAAHg");
	this.shape_28.setTransform(319.525,146.9);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#DBE1E9").s().p("A5wAFIAAgJMAzgAAAIAAAJg");
	this.shape_29.setTransform(190.5,114.65);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#DBE1E9").s().p("A5wAFIAAgJMAzgAAAIAAAJg");
	this.shape_30.setTransform(190.5,82.4);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#CBDAE7").s().p("AgBCbIAAk1IADAAIAAE1g");
	this.shape_31.setTransform(355.5,98.45);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#CBDAE7").s().p("AgBCaIAAkzIADAAIAAEzg");
	this.shape_32.setTransform(355.5,162.075);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#DBE1E9").s().p("AgEPIIAAvTIADAAIAAk0IgDAAIAAlIIADAAIAAk1IgDAAIAAgLIAJAAIAAePg");
	this.shape_33.setTransform(355.85,178.675);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#8A65EC").s().p("AgEAMIAAgXIAJAAIAAAXg");
	this.shape_34.setTransform(241.2,274.275);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#CBC2EA").s().p("AgECQIAAkfIAJAAIAAEfg");
	this.shape_35.setTransform(241.2,258.7);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#DBE1E9").s().p("AgEAAIAAAAIAJAAIAAAAg");
	this.shape_36.setTransform(241.2,244.25);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_37.setTransform(241.2,227.75);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#DBE1E9").s().p("AgEACIAAgDIAJAAIAAADg");
	this.shape_38.setTransform(241.2,212.1);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#00B8CB").s().p("AgEALIAAgVIAJAAIAAAVg");
	this.shape_39.setTransform(241.2,209.75);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#86DCE8").s().p("AgECPIAAkdIAJAAIAAEdg");
	this.shape_40.setTransform(241.2,194.325);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#DBE1E9").s().p("AgEACIAAgDIAJAAIAAADg");
	this.shape_41.setTransform(241.2,179.85);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#8A65EC").s().p("AgEALIAAgWIAJAAIAAAWg");
	this.shape_42.setTransform(241.2,177.5);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#CBC2EA").s().p("AgECQIAAkfIAJAAIAAEfg");
	this.shape_43.setTransform(241.2,161.925);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#DBE1E9").s().p("AgEABIAAgBIAJAAIAAABg");
	this.shape_44.setTransform(241.2,147.45);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_45.setTransform(241.2,130.675);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#DBE1E9").s().p("AgECcIAAgDIAJAAIAAADgAgEiaIAAgBIAJAAIAAABg");
	this.shape_46.setTransform(241.2,130.775);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#DBE1E9").s().p("AgEAAIAAAAIAJAAIAAAAg");
	this.shape_47.setTransform(241.2,82.95);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#DBE1E9").s().p("AgECcIAAk3IAJAAIAAE3g");
	this.shape_48.setTransform(126.5,259.825);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#00AE53").s().p("AgEAEIAAgIIAJAAIAAAIg");
	this.shape_49.setTransform(126.525,242.75);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#9DE0BB").s().p("AgECYIAAkvIAJAAIAAEvg");
	this.shape_50.setTransform(126.525,227.1);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#DBE1E9").s().p("AAACcIAAk4IAAAAIAAE4g");
	this.shape_51.setTransform(126.025,227.55);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_52.setTransform(126.5,195.25);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#DBE1E9").s().p("AgEE9IAAgCIAJAAIAAACgAgEAHIAAgCIAJAAIAAACgAgEgEIAAk4IAJAAIAAE4g");
	this.shape_53.setTransform(126.5,179.15);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_54.setTransform(126.5,130.675);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#DBE1E9").s().p("AgEE+IAAgEIAJAAIAAAEgAgEAGIAAgBIAJAAIAAABgAgEgEIAAk5IAJAAIAAE5g");
	this.shape_55.setTransform(126.5,114.65);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#CBDAE7").s().p("AgECbIAAk0IAJAAIAAE0g");
	this.shape_56.setTransform(298.55,259.85);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#DBE1E9").s().p("AgECcIAAgBIAJAAIAAABgAgEiZIAAgCIAJAAIAAACg");
	this.shape_57.setTransform(298.55,259.825);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_58.setTransform(298.55,227.75);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#DBE1E9").s().p("AgECjIAAgEIAJAAIAAAEgAgECVIAAk3IAJAAIAAE3g");
	this.shape_59.setTransform(298.55,195.975);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#CBDAE7").s().p("AgECWIAAkrIAJAAIAAErg");
	this.shape_60.setTransform(298.55,162.45);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#DBE1E9").s().p("AgEE9IAAgLIAJAAIAAALgAgEgEIAAk5IAJAAIAAE5g");
	this.shape_61.setTransform(298.55,146.9);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#CBDAE7").s().p("AgECbIAAk1IAJAAIAAE1g");
	this.shape_62.setTransform(298.55,98.45);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f("#DBE1E9").s().p("AgECcIAAgCIAJAAIAAACgAgEiaIAAgBIAJAAIAAABg");
	this.shape_63.setTransform(298.55,98.525);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f("#8A65EC").s().p("AgEAMIAAgXIAJAAIAAAXg");
	this.shape_64.setTransform(183.85,274.275);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f("#CBC2EA").s().p("AgECQIAAkfIAJAAIAAEfg");
	this.shape_65.setTransform(183.85,258.7);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f("#DBE1E9").s().p("AgEFDIAAgBIAJAAIAAABgAgEE4IAAk4IAJAAIAAE4gAgEgKIAAk4IAJAAIAAE4g");
	this.shape_66.setTransform(183.85,211.975);

	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f("#8A65EC").s().p("AgEALIAAgWIAJAAIAAAWg");
	this.shape_67.setTransform(183.85,177.5);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#CBC2EA").s().p("AgECQIAAkfIAJAAIAAEfg");
	this.shape_68.setTransform(183.85,161.925);

	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f("#DBE1E9").s().p("AgEABIAAgBIAJAAIAAABg");
	this.shape_69.setTransform(183.85,147.45);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_70.setTransform(183.85,130.675);

	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.f("#DBE1E9").s().p("AgECcIAAgDIAJAAIAAADgAgEiaIAAgBIAJAAIAAABg");
	this.shape_71.setTransform(183.85,130.775);

	this.shape_72 = new cjs.Shape();
	this.shape_72.graphics.f("#DBE1E9").s().p("AgEAAIAAAAIAJAAIAAAAg");
	this.shape_72.setTransform(183.85,82.95);

	this.shape_73 = new cjs.Shape();
	this.shape_73.graphics.f("#CBDAE7").s().p("AgECbIAAk0IAJAAIAAE0g");
	this.shape_73.setTransform(341.55,259.85);

	this.shape_74 = new cjs.Shape();
	this.shape_74.graphics.f("#DBE1E9").s().p("AgECcIAAgBIAJAAIAAABgAgEiZIAAgCIAJAAIAAACg");
	this.shape_74.setTransform(341.55,259.825);

	this.shape_75 = new cjs.Shape();
	this.shape_75.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_75.setTransform(341.55,227.75);

	this.shape_76 = new cjs.Shape();
	this.shape_76.graphics.f("#DBE1E9").s().p("AgECjIAAgEIAJAAIAAAEgAgECVIAAk3IAJAAIAAE3g");
	this.shape_76.setTransform(341.55,195.975);

	this.shape_77 = new cjs.Shape();
	this.shape_77.graphics.f("#CBDAE7").s().p("AgECWIAAkrIAJAAIAAErg");
	this.shape_77.setTransform(341.55,162.45);

	this.shape_78 = new cjs.Shape();
	this.shape_78.graphics.f("#DBE1E9").s().p("AgEE9IAAgLIAJAAIAAALgAgEgEIAAk5IAJAAIAAE5g");
	this.shape_78.setTransform(341.55,146.9);

	this.shape_79 = new cjs.Shape();
	this.shape_79.graphics.f("#CBDAE7").s().p("AgECbIAAk1IAJAAIAAE1g");
	this.shape_79.setTransform(341.55,98.45);

	this.shape_80 = new cjs.Shape();
	this.shape_80.graphics.f("#DBE1E9").s().p("AgECcIAAgCIAJAAIAAACgAgEiaIAAgBIAJAAIAAABg");
	this.shape_80.setTransform(341.55,98.525);

	this.shape_81 = new cjs.Shape();
	this.shape_81.graphics.f("#8A65EC").s().p("AgEAMIAAgXIAJAAIAAAXg");
	this.shape_81.setTransform(226.85,274.275);

	this.shape_82 = new cjs.Shape();
	this.shape_82.graphics.f("#CBC2EA").s().p("AgECQIAAkfIAJAAIAAEfg");
	this.shape_82.setTransform(226.85,258.7);

	this.shape_83 = new cjs.Shape();
	this.shape_83.graphics.f("#DBE1E9").s().p("AgEAAIAAAAIAJAAIAAAAg");
	this.shape_83.setTransform(226.85,244.25);

	this.shape_84 = new cjs.Shape();
	this.shape_84.graphics.f("#00AE53").s().p("AgBAGIAAgLIACAAIAAALg");
	this.shape_84.setTransform(226.5,220.275);

	this.shape_85 = new cjs.Shape();
	this.shape_85.graphics.f("#9DE0BB").s().p("AgBAlIAAhJIACAAIAABJg");
	this.shape_85.setTransform(226.5,215.975);

	this.shape_86 = new cjs.Shape();
	this.shape_86.graphics.f("#8862EC").s().p("AgBAEIAAgHIADAAIAAAHg");
	this.shape_86.setTransform(226.525,229.175);

	this.shape_87 = new cjs.Shape();
	this.shape_87.graphics.f("#8E6BEC").s().p("AgBACIAAgDIADAAIAAADg");
	this.shape_87.setTransform(226.525,229.8);

	this.shape_88 = new cjs.Shape();
	this.shape_88.graphics.f("#C3B3EA").s().p("AgBAnIAAhOIADAAIAABOg");
	this.shape_88.setTransform(226.525,224.85);

	this.shape_89 = new cjs.Shape();
	this.shape_89.graphics.f("#CBDAE7").s().p("AgCCaIAAkzIAFAAIAAEzg");
	this.shape_89.setTransform(227.025,227.75);

	this.shape_90 = new cjs.Shape();
	this.shape_90.graphics.f("#DBE1E9").s().p("AgECcIAAiDIAEAAIAACDgAgBhCIAAhVIgDAAIAAgFIAJAAIAAAFIgFAAIAABVg");
	this.shape_90.setTransform(226.85,227.55);

	this.shape_91 = new cjs.Shape();
	this.shape_91.graphics.f("#00B8CB").s().p("AgEALIAAgVIAJAAIAAAVg");
	this.shape_91.setTransform(226.85,209.75);

	this.shape_92 = new cjs.Shape();
	this.shape_92.graphics.f("#86DCE8").s().p("AgECPIAAkdIAJAAIAAEdg");
	this.shape_92.setTransform(226.85,194.325);

	this.shape_93 = new cjs.Shape();
	this.shape_93.graphics.f("#DBE1E9").s().p("AgEACIAAgDIAJAAIAAADg");
	this.shape_93.setTransform(226.85,179.85);

	this.shape_94 = new cjs.Shape();
	this.shape_94.graphics.f("#8A65EC").s().p("AgEALIAAgWIAJAAIAAAWg");
	this.shape_94.setTransform(226.85,177.5);

	this.shape_95 = new cjs.Shape();
	this.shape_95.graphics.f("#CBC2EA").s().p("AgECQIAAkfIAJAAIAAEfg");
	this.shape_95.setTransform(226.85,161.925);

	this.shape_96 = new cjs.Shape();
	this.shape_96.graphics.f("#DBE1E9").s().p("AgEABIAAgBIAJAAIAAABg");
	this.shape_96.setTransform(226.85,147.45);

	this.shape_97 = new cjs.Shape();
	this.shape_97.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_97.setTransform(226.85,130.675);

	this.shape_98 = new cjs.Shape();
	this.shape_98.graphics.f("#DBE1E9").s().p("AgECcIAAgDIAJAAIAAADgAgEiaIAAgBIAJAAIAAABg");
	this.shape_98.setTransform(226.85,130.775);

	this.shape_99 = new cjs.Shape();
	this.shape_99.graphics.f("#DBE1E9").s().p("AgEAAIAAAAIAJAAIAAAAg");
	this.shape_99.setTransform(226.85,82.95);

	this.shape_100 = new cjs.Shape();
	this.shape_100.graphics.f("#DBE1E9").s().p("AgEE+IAAk5IAJAAIAAE5gAgEgEIAAk5IAJAAIAAE5g");
	this.shape_100.setTransform(112.15,243.675);

	this.shape_101 = new cjs.Shape();
	this.shape_101.graphics.f("#CBDAE7").s().p("AgCCaIAAkzIAGAAIAAEzg");
	this.shape_101.setTransform(112.3,195.25);

	this.shape_102 = new cjs.Shape();
	this.shape_102.graphics.f("#DBE1E9").s().p("AgEE9IAAk4IAJAAIAAACIgGAAIAAE0IAGAAIAAACgAgEgEIAAk4IAJAAIAAE4g");
	this.shape_102.setTransform(112.15,179.15);

	this.shape_103 = new cjs.Shape();
	this.shape_103.graphics.f("#CBDAE7").s().p("AgDCaIAAkzIAIAAIAAEzg");
	this.shape_103.setTransform(112.2,130.675);

	this.shape_104 = new cjs.Shape();
	this.shape_104.graphics.f("#DBE1E9").s().p("AgEE+IAAk5IAJAAIAAABIgIAAIAAE0IAIAAIAAAEgAgEgEIAAk5IAJAAIAAE5g");
	this.shape_104.setTransform(112.15,114.65);

	this.shape_105 = new cjs.Shape();
	this.shape_105.graphics.f("#CBDAE7").s().p("AgECbIAAk0IAJAAIAAE0g");
	this.shape_105.setTransform(284.2,259.85);

	this.shape_106 = new cjs.Shape();
	this.shape_106.graphics.f("#DBE1E9").s().p("AgECcIAAgBIAJAAIAAABgAgEiZIAAgCIAJAAIAAACg");
	this.shape_106.setTransform(284.2,259.825);

	this.shape_107 = new cjs.Shape();
	this.shape_107.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_107.setTransform(284.2,227.75);

	this.shape_108 = new cjs.Shape();
	this.shape_108.graphics.f("#DBE1E9").s().p("AgEKHIAAgEIAJAAIAAAEgAgEJ5IAAk5IAJAAIAAE5gAgEE2IAAk3IAJAAIAAE3gAgEgLIAAk5IAJAAIAAE5gAgElOIAAk4IAJAAIAAE4g");
	this.shape_108.setTransform(284.2,147.6);

	this.shape_109 = new cjs.Shape();
	this.shape_109.graphics.f("#8A65EC").s().p("AgEAMIAAgXIAJAAIAAAXg");
	this.shape_109.setTransform(169.5,274.275);

	this.shape_110 = new cjs.Shape();
	this.shape_110.graphics.f("#CBC2EA").s().p("AgECQIAAkfIAJAAIAAEfg");
	this.shape_110.setTransform(169.5,258.7);

	this.shape_111 = new cjs.Shape();
	this.shape_111.graphics.f("#DBE1E9").s().p("AgECiIAAgBIAJAAIAAABgAgECXIAAk4IAJAAIAAE4g");
	this.shape_111.setTransform(169.5,228.1);

	this.shape_112 = new cjs.Shape();
	this.shape_112.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_112.setTransform(169.5,195.25);

	this.shape_113 = new cjs.Shape();
	this.shape_113.graphics.f("#DBE1E9").s().p("AgECcIAAgCIAJAAIAAACgAgEiaIAAgBIAJAAIAAABg");
	this.shape_113.setTransform(169.5,195.275);

	this.shape_114 = new cjs.Shape();
	this.shape_114.graphics.f("#8A65EC").s().p("AgEALIAAgWIAJAAIAAAWg");
	this.shape_114.setTransform(169.5,177.5);

	this.shape_115 = new cjs.Shape();
	this.shape_115.graphics.f("#CBC2EA").s().p("AgECQIAAkfIAJAAIAAEfg");
	this.shape_115.setTransform(169.5,161.925);

	this.shape_116 = new cjs.Shape();
	this.shape_116.graphics.f("#DBE1E9").s().p("AgEABIAAgBIAJAAIAAABg");
	this.shape_116.setTransform(169.5,147.45);

	this.shape_117 = new cjs.Shape();
	this.shape_117.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_117.setTransform(169.5,130.675);

	this.shape_118 = new cjs.Shape();
	this.shape_118.graphics.f("#DBE1E9").s().p("AgECcIAAgDIAJAAIAAADgAgEiaIAAgBIAJAAIAAABg");
	this.shape_118.setTransform(169.5,130.775);

	this.shape_119 = new cjs.Shape();
	this.shape_119.graphics.f("#DBE1E9").s().p("AgEAAIAAAAIAJAAIAAAAg");
	this.shape_119.setTransform(169.5,82.95);

	this.shape_120 = new cjs.Shape();
	this.shape_120.graphics.f("#CBDAE7").s().p("AgECbIAAk0IAJAAIAAE0g");
	this.shape_120.setTransform(327.2,259.85);

	this.shape_121 = new cjs.Shape();
	this.shape_121.graphics.f("#DBE1E9").s().p("AgECcIAAgBIAJAAIAAABgAgEiZIAAgCIAJAAIAAACg");
	this.shape_121.setTransform(327.2,259.825);

	this.shape_122 = new cjs.Shape();
	this.shape_122.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_122.setTransform(327.2,227.75);

	this.shape_123 = new cjs.Shape();
	this.shape_123.graphics.f("#DBE1E9").s().p("AgECjIAAgEIAJAAIAAAEgAgECVIAAk3IAJAAIAAE3g");
	this.shape_123.setTransform(327.2,195.975);

	this.shape_124 = new cjs.Shape();
	this.shape_124.graphics.f("#CBDAE7").s().p("AgECWIAAkrIAJAAIAAErg");
	this.shape_124.setTransform(327.2,162.45);

	this.shape_125 = new cjs.Shape();
	this.shape_125.graphics.f("#DBE1E9").s().p("AgEE9IAAgLIAJAAIAAALgAgEgEIAAk5IAJAAIAAE5g");
	this.shape_125.setTransform(327.2,146.9);

	this.shape_126 = new cjs.Shape();
	this.shape_126.graphics.f("#CBDAE7").s().p("AgECbIAAk1IAJAAIAAE1g");
	this.shape_126.setTransform(327.2,98.45);

	this.shape_127 = new cjs.Shape();
	this.shape_127.graphics.f("#DBE1E9").s().p("AgECcIAAgCIAJAAIAAACgAgEiaIAAgBIAJAAIAAABg");
	this.shape_127.setTransform(327.2,98.525);

	this.shape_128 = new cjs.Shape();
	this.shape_128.graphics.f("#8A65EC").s().p("AgEAMIAAgXIAJAAIAAAXg");
	this.shape_128.setTransform(212.5,274.275);

	this.shape_129 = new cjs.Shape();
	this.shape_129.graphics.f("#CBC2EA").s().p("AgECQIAAkfIAJAAIAAEfg");
	this.shape_129.setTransform(212.5,258.7);

	this.shape_130 = new cjs.Shape();
	this.shape_130.graphics.f("#DBE1E9").s().p("AgEAAIAAAAIAJAAIAAAAg");
	this.shape_130.setTransform(212.5,244.25);

	this.shape_131 = new cjs.Shape();
	this.shape_131.graphics.f("#00AE53").s().p("AgEAGIAAgLIAJAAIAAALg");
	this.shape_131.setTransform(212.5,220.275);

	this.shape_132 = new cjs.Shape();
	this.shape_132.graphics.f("#9DE0BB").s().p("AgEAlIAAhJIAJAAIAABJg");
	this.shape_132.setTransform(212.5,215.975);

	this.shape_133 = new cjs.Shape();
	this.shape_133.graphics.f("#8862EC").s().p("AgEAEIAAgHIAJAAIAAAHg");
	this.shape_133.setTransform(212.5,229.175);

	this.shape_134 = new cjs.Shape();
	this.shape_134.graphics.f("#8E6BEC").s().p("AgEACIAAgDIAJAAIAAADg");
	this.shape_134.setTransform(212.5,229.8);

	this.shape_135 = new cjs.Shape();
	this.shape_135.graphics.f("#DBE1E9").s().p("AgEBCIAAiDIAJAAIAACDg");
	this.shape_135.setTransform(212.5,236.625);

	this.shape_136 = new cjs.Shape();
	this.shape_136.graphics.f("#C3B3EA").s().p("AgEAnIAAhOIAJAAIAABOg");
	this.shape_136.setTransform(212.5,224.85);

	this.shape_137 = new cjs.Shape();
	this.shape_137.graphics.f("#DBE1E9").s().p("AgEACIAAgDIAJAAIAAADg");
	this.shape_137.setTransform(212.5,212.1);

	this.shape_138 = new cjs.Shape();
	this.shape_138.graphics.f("#00B8CB").s().p("AgEALIAAgVIAJAAIAAAVg");
	this.shape_138.setTransform(212.5,209.75);

	this.shape_139 = new cjs.Shape();
	this.shape_139.graphics.f("#86DCE8").s().p("AgECPIAAkdIAJAAIAAEdg");
	this.shape_139.setTransform(212.5,194.325);

	this.shape_140 = new cjs.Shape();
	this.shape_140.graphics.f("#DBE1E9").s().p("AgEACIAAgDIAJAAIAAADg");
	this.shape_140.setTransform(212.5,179.85);

	this.shape_141 = new cjs.Shape();
	this.shape_141.graphics.f("#8A65EC").s().p("AgEALIAAgWIAJAAIAAAWg");
	this.shape_141.setTransform(212.5,177.5);

	this.shape_142 = new cjs.Shape();
	this.shape_142.graphics.f("#CBC2EA").s().p("AgECQIAAkfIAJAAIAAEfg");
	this.shape_142.setTransform(212.5,161.925);

	this.shape_143 = new cjs.Shape();
	this.shape_143.graphics.f("#DBE1E9").s().p("AgEABIAAgBIAJAAIAAABg");
	this.shape_143.setTransform(212.5,147.45);

	this.shape_144 = new cjs.Shape();
	this.shape_144.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_144.setTransform(212.5,130.675);

	this.shape_145 = new cjs.Shape();
	this.shape_145.graphics.f("#DBE1E9").s().p("AgECcIAAgDIAJAAIAAADgAgEiaIAAgBIAJAAIAAABg");
	this.shape_145.setTransform(212.5,130.775);

	this.shape_146 = new cjs.Shape();
	this.shape_146.graphics.f("#DBE1E9").s().p("AgEAAIAAAAIAJAAIAAAAg");
	this.shape_146.setTransform(212.5,82.95);

	this.shape_147 = new cjs.Shape();
	this.shape_147.graphics.f("#DBE1E9").s().p("AgECcIAAk3IAJAAIAAE3g");
	this.shape_147.setTransform(269.85,259.825);

	this.shape_148 = new cjs.Shape();
	this.shape_148.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_148.setTransform(269.85,227.75);

	this.shape_149 = new cjs.Shape();
	this.shape_149.graphics.f("#DBE1E9").s().p("AgEACIAAgDIAJAAIAAADg");
	this.shape_149.setTransform(269.85,212.1);

	this.shape_150 = new cjs.Shape();
	this.shape_150.graphics.f("#00B8CB").s().p("AgEALIAAgVIAJAAIAAAVg");
	this.shape_150.setTransform(269.85,209.75);

	this.shape_151 = new cjs.Shape();
	this.shape_151.graphics.f("#86DCE8").s().p("AgECPIAAkdIAJAAIAAEdg");
	this.shape_151.setTransform(269.85,194.325);

	this.shape_152 = new cjs.Shape();
	this.shape_152.graphics.f("#DBE1E9").s().p("AgEACIAAgDIAJAAIAAADg");
	this.shape_152.setTransform(269.85,179.85);

	this.shape_153 = new cjs.Shape();
	this.shape_153.graphics.f("#00AE53").s().p("AgEABIAAgBIAJAAIAAABg");
	this.shape_153.setTransform(269.875,147.45);

	this.shape_154 = new cjs.Shape();
	this.shape_154.graphics.f("#DBE1E9").s().p("AgECcIAAk3IAAAAIAAABIAJAAIAAE2g");
	this.shape_154.setTransform(269.85,163.025);

	this.shape_155 = new cjs.Shape();
	this.shape_155.graphics.f("#00AE53").s().p("AgEABIAAgBIAJAAIAAABg");
	this.shape_155.setTransform(269.875,146.325);

	this.shape_156 = new cjs.Shape();
	this.shape_156.graphics.f("#9DE0BB").s().p("AgECbIAAk1IAJAAIAAE1g");
	this.shape_156.setTransform(269.875,130.75);

	this.shape_157 = new cjs.Shape();
	this.shape_157.graphics.f("#DBE1E9").s().p("AgEE+IAAk5IAJAAIAAABIgJAAIAAE4gAgEgEIAAk5IAJAAIAAE5g");
	this.shape_157.setTransform(269.85,114.65);

	this.shape_158 = new cjs.Shape();
	this.shape_158.graphics.f("#8A65EC").s().p("AgEAMIAAgXIAJAAIAAAXg");
	this.shape_158.setTransform(155.15,274.275);

	this.shape_159 = new cjs.Shape();
	this.shape_159.graphics.f("#CBC2EA").s().p("AgECQIAAkfIAJAAIAAEfg");
	this.shape_159.setTransform(155.15,258.7);

	this.shape_160 = new cjs.Shape();
	this.shape_160.graphics.f("#DBE1E9").s().p("AgECiIAAgBIAJAAIAAABgAgECXIAAk4IAJAAIAAE4g");
	this.shape_160.setTransform(155.15,228.1);

	this.shape_161 = new cjs.Shape();
	this.shape_161.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_161.setTransform(155.15,195.25);

	this.shape_162 = new cjs.Shape();
	this.shape_162.graphics.f("#DBE1E9").s().p("AgECcIAAgCIAJAAIAAACgAgEiaIAAgBIAJAAIAAABg");
	this.shape_162.setTransform(155.15,195.275);

	this.shape_163 = new cjs.Shape();
	this.shape_163.graphics.f("#8A65EC").s().p("AgEALIAAgWIAJAAIAAAWg");
	this.shape_163.setTransform(155.15,177.5);

	this.shape_164 = new cjs.Shape();
	this.shape_164.graphics.f("#CBC2EA").s().p("AgECQIAAkfIAJAAIAAEfg");
	this.shape_164.setTransform(155.15,161.925);

	this.shape_165 = new cjs.Shape();
	this.shape_165.graphics.f("#DBE1E9").s().p("AgEABIAAgBIAJAAIAAABg");
	this.shape_165.setTransform(155.15,147.45);

	this.shape_166 = new cjs.Shape();
	this.shape_166.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_166.setTransform(155.15,130.675);

	this.shape_167 = new cjs.Shape();
	this.shape_167.graphics.f("#DBE1E9").s().p("AgECcIAAgDIAJAAIAAADgAgEiaIAAgBIAJAAIAAABg");
	this.shape_167.setTransform(155.15,130.775);

	this.shape_168 = new cjs.Shape();
	this.shape_168.graphics.f("#DBE1E9").s().p("AgEAAIAAAAIAJAAIAAAAg");
	this.shape_168.setTransform(155.15,82.95);

	this.shape_169 = new cjs.Shape();
	this.shape_169.graphics.f("#CBDAE7").s().p("AgECbIAAk0IAJAAIAAE0g");
	this.shape_169.setTransform(312.85,259.85);

	this.shape_170 = new cjs.Shape();
	this.shape_170.graphics.f("#DBE1E9").s().p("AgECcIAAgBIAJAAIAAABgAgEiZIAAgCIAJAAIAAACg");
	this.shape_170.setTransform(312.85,259.825);

	this.shape_171 = new cjs.Shape();
	this.shape_171.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_171.setTransform(312.85,227.75);

	this.shape_172 = new cjs.Shape();
	this.shape_172.graphics.f("#DBE1E9").s().p("AgECjIAAgEIAJAAIAAAEgAgECVIAAk3IAJAAIAAE3g");
	this.shape_172.setTransform(312.85,195.975);

	this.shape_173 = new cjs.Shape();
	this.shape_173.graphics.f("#CBDAE7").s().p("AgECWIAAkrIAJAAIAAErg");
	this.shape_173.setTransform(312.85,162.45);

	this.shape_174 = new cjs.Shape();
	this.shape_174.graphics.f("#DBE1E9").s().p("AgEE9IAAgLIAJAAIAAALgAgEgEIAAk5IAJAAIAAE5g");
	this.shape_174.setTransform(312.85,146.9);

	this.shape_175 = new cjs.Shape();
	this.shape_175.graphics.f("#CBDAE7").s().p("AgECbIAAk1IAJAAIAAE1g");
	this.shape_175.setTransform(312.85,98.45);

	this.shape_176 = new cjs.Shape();
	this.shape_176.graphics.f("#DBE1E9").s().p("AgECcIAAgCIAJAAIAAACgAgEiaIAAgBIAJAAIAAABg");
	this.shape_176.setTransform(312.85,98.525);

	this.shape_177 = new cjs.Shape();
	this.shape_177.graphics.f("#8A65EC").s().p("AgEAMIAAgXIAJAAIAAAXg");
	this.shape_177.setTransform(198.2,274.275);

	this.shape_178 = new cjs.Shape();
	this.shape_178.graphics.f("#CBC2EA").s().p("AgECQIAAkfIAJAAIAAEfg");
	this.shape_178.setTransform(198.2,258.7);

	this.shape_179 = new cjs.Shape();
	this.shape_179.graphics.f("#DBE1E9").s().p("AgEAAIAAAAIAJAAIAAAAg");
	this.shape_179.setTransform(198.2,244.25);

	this.shape_180 = new cjs.Shape();
	this.shape_180.graphics.f("#00AE53").s().p("AgCAGIAAgLIAGAAIAAALg");
	this.shape_180.setTransform(198.35,220.275);

	this.shape_181 = new cjs.Shape();
	this.shape_181.graphics.f("#9DE0BB").s().p("AgCAlIAAhJIAGAAIAABJg");
	this.shape_181.setTransform(198.35,215.975);

	this.shape_182 = new cjs.Shape();
	this.shape_182.graphics.f("#8862EC").s().p("AgCAEIAAgHIAFAAIAAAHg");
	this.shape_182.setTransform(198.375,229.175);

	this.shape_183 = new cjs.Shape();
	this.shape_183.graphics.f("#8E6BEC").s().p("AgCACIAAgDIAFAAIAAADg");
	this.shape_183.setTransform(198.375,229.8);

	this.shape_184 = new cjs.Shape();
	this.shape_184.graphics.f("#C3B3EA").s().p("AgCAnIAAhOIAFAAIAABOg");
	this.shape_184.setTransform(198.375,224.85);

	this.shape_185 = new cjs.Shape();
	this.shape_185.graphics.f("#DBE1E9").s().p("AgEE+IAAk5IAJAAIAAAEIgGAAIAABWIABAAIAABbIAFAAIAACEgAgEgEIAAk5IAJAAIAAE5g");
	this.shape_185.setTransform(198.2,211.425);

	this.shape_186 = new cjs.Shape();
	this.shape_186.graphics.f("#8A65EC").s().p("AgEALIAAgWIAJAAIAAAWg");
	this.shape_186.setTransform(198.2,177.5);

	this.shape_187 = new cjs.Shape();
	this.shape_187.graphics.f("#CBC2EA").s().p("AgECQIAAkfIAJAAIAAEfg");
	this.shape_187.setTransform(198.2,161.925);

	this.shape_188 = new cjs.Shape();
	this.shape_188.graphics.f("#DBE1E9").s().p("AgEABIAAgBIAJAAIAAABg");
	this.shape_188.setTransform(198.2,147.45);

	this.shape_189 = new cjs.Shape();
	this.shape_189.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_189.setTransform(198.2,130.675);

	this.shape_190 = new cjs.Shape();
	this.shape_190.graphics.f("#DBE1E9").s().p("AgECcIAAgDIAJAAIAAADgAgEiaIAAgBIAJAAIAAABg");
	this.shape_190.setTransform(198.2,130.775);

	this.shape_191 = new cjs.Shape();
	this.shape_191.graphics.f("#DBE1E9").s().p("AgEAAIAAAAIAJAAIAAAAg");
	this.shape_191.setTransform(198.2,82.95);

	this.shape_192 = new cjs.Shape();
	this.shape_192.graphics.f("#DBE1E9").s().p("AgECcIAAk3IAJAAIAAE3g");
	this.shape_192.setTransform(255.5,259.825);

	this.shape_193 = new cjs.Shape();
	this.shape_193.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_193.setTransform(255.5,227.75);

	this.shape_194 = new cjs.Shape();
	this.shape_194.graphics.f("#DBE1E9").s().p("AgEACIAAgDIAJAAIAAADg");
	this.shape_194.setTransform(255.5,212.1);

	this.shape_195 = new cjs.Shape();
	this.shape_195.graphics.f("#00B8CB").s().p("AgEALIAAgVIAJAAIAAAVg");
	this.shape_195.setTransform(255.5,209.75);

	this.shape_196 = new cjs.Shape();
	this.shape_196.graphics.f("#86DCE8").s().p("AgECPIAAkdIAJAAIAAEdg");
	this.shape_196.setTransform(255.5,194.325);

	this.shape_197 = new cjs.Shape();
	this.shape_197.graphics.f("#DBE1E9").s().p("AgEHmIAAgEIAJAAIAAAEgAgEHYIAAk5IAJAAIAAE5gAgECVIAAk3IAJAAIAAE3gAgEisIAAk5IAJAAIAAE5g");
	this.shape_197.setTransform(255.5,131.475);

	this.shape_198 = new cjs.Shape();
	this.shape_198.graphics.f("#8A65EC").s().p("AgEAMIAAgXIAJAAIAAAXg");
	this.shape_198.setTransform(140.85,274.275);

	this.shape_199 = new cjs.Shape();
	this.shape_199.graphics.f("#CBC2EA").s().p("AgECQIAAkfIAJAAIAAEfg");
	this.shape_199.setTransform(140.85,258.7);

	this.shape_200 = new cjs.Shape();
	this.shape_200.graphics.f("#DBE1E9").s().p("AgECiIAAgBIAJAAIAAABgAgECXIAAk4IAJAAIAAE4g");
	this.shape_200.setTransform(140.85,228.1);

	this.shape_201 = new cjs.Shape();
	this.shape_201.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_201.setTransform(140.85,195.25);

	this.shape_202 = new cjs.Shape();
	this.shape_202.graphics.f("#DBE1E9").s().p("AgECcIAAgCIAJAAIAAACgAgEiaIAAgBIAJAAIAAABg");
	this.shape_202.setTransform(140.85,195.275);

	this.shape_203 = new cjs.Shape();
	this.shape_203.graphics.f("#8A65EC").s().p("AgEALIAAgWIAJAAIAAAWg");
	this.shape_203.setTransform(140.85,177.5);

	this.shape_204 = new cjs.Shape();
	this.shape_204.graphics.f("#CBC2EA").s().p("AgECQIAAkfIAJAAIAAEfg");
	this.shape_204.setTransform(140.85,161.925);

	this.shape_205 = new cjs.Shape();
	this.shape_205.graphics.f("#DBE1E9").s().p("AgEABIAAgBIAJAAIAAABg");
	this.shape_205.setTransform(140.85,147.45);

	this.shape_206 = new cjs.Shape();
	this.shape_206.graphics.f("#CBDAE7").s().p("AgECaIAAkzIAJAAIAAEzg");
	this.shape_206.setTransform(140.85,130.675);

	this.shape_207 = new cjs.Shape();
	this.shape_207.graphics.f("#DBE1E9").s().p("AgECcIAAgDIAJAAIAAADgAgEiaIAAgBIAJAAIAAABg");
	this.shape_207.setTransform(140.85,130.775);

	this.shape_208 = new cjs.Shape();
	this.shape_208.graphics.f("#DBE1E9").s().p("AgEAAIAAAAIAJAAIAAAAg");
	this.shape_208.setTransform(140.85,82.95);

	this.shape_209 = new cjs.Shape();
	this.shape_209.graphics.f("#DBE1E9").s().p("AgEPDIAAk5IAJAAIAAE5gAgEKAIAAk5IAJAAIAAE5gAgEE9IAAk4IAJAAIAAE4gAgEgEIAAk5IAJAAIAAE5gAgElHIAAk4IAJAAIAAE4gAgEqJIAAk5IAJAAIAAE5g");
	this.shape_209.setTransform(26.15,179.175);

	this.shape_210 = new cjs.Shape();
	this.shape_210.graphics.f("#00C34D").s().p("AhCAEIAAgIICFAAIAAAIg");
	this.shape_210.setTransform(133.675,242.75);

	this.shape_211 = new cjs.Shape();
	this.shape_211.graphics.f("#B7FDC8").s().p("AhCCYIAAkvICFAAIAAEvg");
	this.shape_211.setTransform(133.675,227.1);

	this.shape_212 = new cjs.Shape();
	this.shape_212.graphics.f("#00C34D").s().p("AhCABIAAgBICFAAIAAABg");
	this.shape_212.setTransform(277.025,147.45);

	this.shape_213 = new cjs.Shape();
	this.shape_213.graphics.f("#00C34D").s().p("AhCABIAAgBICFAAIAAABg");
	this.shape_213.setTransform(277.025,146.325);

	this.shape_214 = new cjs.Shape();
	this.shape_214.graphics.f("#B7FDC8").s().p("AhCCbIAAk1ICFAAIAAE1g");
	this.shape_214.setTransform(277.025,130.75);

	this.shape_215 = new cjs.Shape();
	this.shape_215.graphics.f("#00C34D").s().p("AAFAGIAAgLICFAAIAAALgAiJAGIAAgLICFAAIAAALg");
	this.shape_215.setTransform(212.525,220.275);

	this.shape_216 = new cjs.Shape();
	this.shape_216.graphics.f("#B7FDC8").s().p("AAFAlIAAhJICFAAIAABJgAiJAlIAAhJICFAAIAABJg");
	this.shape_216.setTransform(212.525,215.975);

	this.shape_217 = new cjs.Shape();
	this.shape_217.graphics.f("#9D6BFF").s().p("AhBAEIAAgHICEAAIAAAHg");
	this.shape_217.setTransform(205.35,229.175);

	this.shape_218 = new cjs.Shape();
	this.shape_218.graphics.f("#A576FF").s().p("AhBACIAAgDICEAAIAAADg");
	this.shape_218.setTransform(205.35,229.8);

	this.shape_219 = new cjs.Shape();
	this.shape_219.graphics.f("#9D6BFF").s().p("AhCAEIAAgHICFAAIAAAHg");
	this.shape_219.setTransform(219.675,229.175);

	this.shape_220 = new cjs.Shape();
	this.shape_220.graphics.f("#A576FF").s().p("AhCACIAAgDICFAAIAAADg");
	this.shape_220.setTransform(219.675,229.8);

	this.shape_221 = new cjs.Shape();
	this.shape_221.graphics.f("#E1CAFF").s().p("AAFAnIAAhOICFAAIAABOgAiJAnIAAhOICFAAIAABOg");
	this.shape_221.setTransform(212.525,224.85);

	this.shape_222 = new cjs.Shape();
	this.shape_222.graphics.f("#A06EFF").s().p("AGzAMIAAgXICFAAIAAAXgAEkAMIAAgXICFAAIAAAXgACUAMIAAgXICGAAIAAAXgAAFAMIAAgXICFAAIAAAXgAiJAMIAAgXICFAAIAAAXgAkZAMIAAgXICGAAIAAAXgAmoAMIAAgXICFAAIAAAXgAo3AMIAAgXICFAAIAAAXg");
	this.shape_222.setTransform(198.175,274.275);

	this.shape_223 = new cjs.Shape();
	this.shape_223.graphics.f("#EBDBFF").s().p("AGzCQIAAkfICFAAIAAEfgAEkCQIAAkfICFAAIAAEfgACUCQIAAkfICGAAIAAEfgAAFCQIAAkfICFAAIAAEfgAiJCQIAAkfICFAAIAAEfgAkZCQIAAkfICGAAIAAEfgAmoCQIAAkfICFAAIAAEfgAo3CQIAAkfICFAAIAAEfg");
	this.shape_223.setTransform(198.175,258.7);

	this.shape_224 = new cjs.Shape();
	this.shape_224.graphics.f("#A06EFF").s().p("AGzALIAAgWICFAAIAAAWgAEkALIAAgWICFAAIAAAWgACUALIAAgWICGAAIAAAWgAAFALIAAgWICFAAIAAAWgAiJALIAAgWICFAAIAAAWgAkZALIAAgWICGAAIAAAWgAmoALIAAgWICFAAIAAAWgAo3ALIAAgWICFAAIAAAWg");
	this.shape_224.setTransform(198.175,177.5);

	this.shape_225 = new cjs.Shape();
	this.shape_225.graphics.f("#EBDBFF").s().p("AGzCQIAAkfICFAAIAAEfgAEkCQIAAkfICFAAIAAEfgACUCQIAAkfICGAAIAAEfgAAFCQIAAkfICFAAIAAEfgAiJCQIAAkfICFAAIAAEfgAkZCQIAAkfICGAAIAAEfgAmoCQIAAkfICFAAIAAEfgAo3CQIAAkfICFAAIAAEfg");
	this.shape_225.setTransform(198.175,161.925);

	this.shape_226 = new cjs.Shape();
	this.shape_226.graphics.f("#EBF6FC").s().p("ADnCbIAAk0ICCAAIAAE0gABXCbIAAk0ICGAAIAAE0gAg3CbIAAk0ICEAAIAAE0gAjGCbIAAk0ICFAAIAAE0gAlWCbIAAk0ICGAAIAAE0gAloCbIAAk0IAIAAIAAE0g");
	this.shape_226.setTransform(318.95,259.85);

	this.shape_227 = new cjs.Shape();
	this.shape_227.graphics.f("#EBF6FC").s().p("AH9CaIAAkzICBAAIAAEzgAFtCaIAAkzICFAAIAAEzgADeCaIAAkzICFAAIAAEzgABPCaIAAkzICFAAIAAEzgAhACaIAAkzICFAAIAAEzgAjPCaIAAkzICFAAIAAEzgAlfCaIAAkzICGAAIAAEzgAnuCaIAAkzICFAAIAAEzgAp+CaIAAkzICGAAIAAEzg");
	this.shape_227.setTransform(291.2,227.75);

	this.shape_228 = new cjs.Shape();
	this.shape_228.graphics.f("#EBF6FC").s().p("ACVCbIAAk1ICEAAIAAE1gAAFCbIAAk1ICFAAIAAE1gAiJCbIAAk1ICFAAIAAE1gAkYCbIAAk1ICFAAIAAE1g");
	this.shape_228.setTransform(327.2,98.45);

	this.shape_229 = new cjs.Shape();
	this.shape_229.graphics.f("#EBF6FC").s().p("ACVCWIAAkrICEAAIAAErgAAFCWIAAkrICFAAIAAErgAiJCWIAAkrICFAAIAAErgAkYCWIAAkrICFAAIAAErg");
	this.shape_229.setTransform(327.2,162.45);

	this.shape_230 = new cjs.Shape();
	this.shape_230.graphics.f("#EBF6FC").s().p("ADcCaIAAkzICFAAIAAEzgABNCaIAAkzICFAAIAAEzgAhBCaIAAkzICEAAIAAEzgAjRCaIAAkzICGAAIAAEzgAlgCaIAAkzICFAAIAAEzg");
	this.shape_230.setTransform(147.975,195.25);

	this.shape_231 = new cjs.Shape();
	this.shape_231.graphics.f("#EBF6FC").s().p("AJDCaIAAkzICFAAIAAEzgAGzCaIAAkzICGAAIAAEzgAEkCaIAAkzICFAAIAAEzgACVCaIAAkzICFAAIAAEzgAAFCaIAAkzICGAAIAAEzgAiJCaIAAkzICFAAIAAEzgAkZCaIAAkzICGAAIAAEzgAmoCaIAAkzICFAAIAAEzgAo3CaIAAkzICFAAIAAEzgArHCaIAAkzICGAAIAAEzg");
	this.shape_231.setTransform(183.825,130.675);

	this.shape_232 = new cjs.Shape();
	this.shape_232.graphics.f("#00D0DB").s().p("ADcALIAAgVICFAAIAAAVgABMALIAAgVICGAAIAAAVgAhBALIAAgVICDAAIAAAVgAjRALIAAgVICFAAIAAAVgAlgALIAAgVICFAAIAAAVg");
	this.shape_232.setTransform(248.35,209.75);

	this.shape_233 = new cjs.Shape();
	this.shape_233.graphics.f("#9DF9FD").s().p("ADcCPIAAkdICFAAIAAEdgABMCPIAAkdICGAAIAAEdgAhBCPIAAkdICDAAIAAEdgAjRCPIAAkdICFAAIAAEdgAlgCPIAAkdICFAAIAAEdg");
	this.shape_233.setTransform(248.35,194.325);

	this.shape_234 = new cjs.Shape();
	this.shape_234.graphics.f("#000000").s().p("AANAqIACgFIACgFIAAgNIAJAAIAAAIQABAEgDAFQgCAFgFAEgADgAdQgDgBgEgDQgDgEgCgFQgCgEAAgGIAAgCQAAgEACgHIAFgJQADgDAFgCQAFgCADAAQAEAAAGACQAFACACADQAEAEAAAFQACAEAAAFIAAAFIgkAAIABAGQABADABACIAGAFQADABADAAQAFAAADgCQADgBADgEIAFAEIgEAFQgCADgEABQgFACgFAAQgGAAgEgDgADjgOIgEAEIgCAGIgBAEIAbAAIAAgBIgCgHIgEgFQgEgDgEAAIgGACgAC9AeQgDAAgBgEQgCgFgBgEIAAggIgJAAIAAgHIAJAAIAAgNIAKAAIAAANIAKAAIAAAHIgKAAIAAAgIABAFIACACIAFAAIACgBIAAAIIgHABQgDAAgDgCgACKAdIgIgEQgDgEgCgFQgBgEAAgGIAAgCQAAgHABgEIAGgJIAHgFIAJgCQAEAAAGACQAEACACADQACADADAGQABAEAAAFIAAAFIgkAAIABAGQABADACACIAFAFQADABAEAAQAFAAADgCQADgBACgEIAGAEIgEAFQgDADgEABQgDACgGAAQgGAAgEgDgACNgOIgFAEIgCAGIgBAEIAbAAIAAgBQgBgEgBgDQAAgCgEgDQgDgDgEAAIgGACgAhQAdQgEgBgDgEQgCgEAAgEIACgIQABgDAEgDIAIgCQAEgBAGAAIAJAAIAAgEQgBgDgBgCQAAgBgBgBQAAAAAAgBQgBAAAAAAQgBgBgBAAQgDgCgDAAIgGACIgEADQAAAAgBABQAAAAAAABQAAAAAAABQgBAAAAABIgJAAQAAgDACgCIAEgGIAHgDQAEgCAFAAQAEAAAGACQAFADACADQACAFABAFIAAAYIAAAGIABAFIAAABIgJAAIgBgFIAAgBIgCABIgGAEQgDACgFAAQgFAAgEgDgAhGAGIgFABIgEADIgBAFIABAEIAEAEIAFABQAFgBADgBQADgCACgDIACgCIAAgKIgIAAgAjRAdQgEgBgDgEIgGgJQgBgFAAgFIAAgBIABgLIAGgIQADgEAEgBQAFgDAFAAQAGAAAEADQAEABAEAEIAFAIIACALIAAABQAAAFgCAFQgBAFgEAEQgEAEgEABQgEADgGAAQgGAAgEgDgAjOgNIgEADQgCADgBAEIgBAHIAAABIABAHQABAEACACQABADADACQADABAEAAQAEAAADgBQADgCABgDQADgCABgEIABgHIAAgBIgBgHQgBgEgDgDIgEgDQgEgDgDAAIgHADgAEKAfIAAg1IAJAAIAAAGIAFgFQAEgCAEAAIAEABIAAAJIgDgBIgCAAIgFABIgFADIgCAEIAAAlgABAAfIAAhHIAbAAQAJAAAFADQAFACADAGQADAEAAAHQAAAHgDAEQgDAFgFACQgHACgHAAIgRAAIAAAdgABKgEIARAAQAGAAADgCIAFgFQABgDAAgEQAAgEgBgDQgBgCgEgDQgDgCgGgBIgRAAgAAAAfIgRgZIgGAGIAAATIgJAAIAAhLIAJAAIAAAtIAWgXIAJAAIgTAWIAWAfgAh3AfIgNgoIgNAoIgIAAIgPg1IAJAAIALAnIAMgnIAIAAIAMAoIAKgoIAJAAIgPA1gAj1AfIgkg3IAAA3IgKAAIAAhHIAKAAIAkA3IAAg3IAJAAIAABHg");
	this.shape_234.setTransform(64.95,260.7);

	this.shape_235 = new cjs.Shape();
	this.shape_235.graphics.f("#000000").s().p("AjCAwIAAgHIADAAIAFgBIAEgDIAEgKIgTg1IAKAAIAOAoIAMgoIAKAAIgWA9IgCAFIgDAEIgEADQgDABgEABgAgJAmIACgFIACgEIAAgNIAIAAIAAAHQAAAFgCAFQgBAFgEADgADzAaQgFgDgCgDQgDgDgCgFQgCgFAAgGIAAgBIACgKQACgFADgEQADgDAEgCQAGgDAFAAQAEAAAGADQAEACADADQAEAFABAEIACAKIAAABQAAAGgCAFQgBAFgEADQgDAEgEACQgEACgGAAQgHAAgEgCgAD3gSIgFAFQgCADgBAEIgBAGIAAABIABAHQABAFACABQABADAEACQADACAEAAQADAAADgCQADgCACgDQACgBABgFIABgHIAAgBIgBgGQgBgEgCgDIgFgFQgDgBgDAAQgEAAgDABgAC7AZQgFgCgCgEQgDgEAAgEIAJAAQABAEACABQABACADACIAGABIAGgBIAEgDIACgEIgBgEIgEgDIgQgEIgGgDIgEgEIgBgGQAAgDACgDQABgDACgBIAHgEIAIgCQAGAAAFADQAFADACADQACAEAAAEIgJAAIgBgEIgEgEQgCgBgEAAQgEAAgCABIgEADIgBAEIABACIACADIADACIAHABQAGACAEABQAEABADAEQACADAAAEQAAADgCADIgEAFIgGAEIgJABQgHAAgFgDgAgwAZQgFgCgDgEQgCgEAAgEIAJAAQABAEABABQACADADABIAGABIAGgBIAEgDIABgEIgBgEIgDgDIgQgEIgGgDIgEgEIgBgGIABgGIAEgEIAGgEIAIgCQAGAAAFADQAFADACADQADAEAAAEIgKAAIgBgEIgEgEQgCgBgEAAQgDAAgDABIgDADIgBAEIAAACIACADIAEACIAGABQAFABAGACQADABADAEQACAEAAADQAAADgBADIgFAFIgGAEIgIABQgHAAgFgDgAiEAaQgEgBgDgEQgDgDgCgFQgCgFAAgGIAAgCQAAgDACgIQACgFADgDQAEgEAEgBQAFgDADAAQAEAAAGADQAFACACADQACADACAFQABAFAAAGIAAADIgkAAIABAGQABAEACACIAFAEQADACAEAAQAFAAADgDIAGgEIAFADIgEAGIgHADQgDACgGAAQgGAAgEgCgAiBgSIgEAFIgDAFIgBAFIAbAAIAAgBIgBgHIgEgGQgEgCgEAAIgGABgAjoAaQgEgBgDgEQgDgDgCgFQgCgFAAgGIAAgCQAAgDACgIQACgFADgDQAEgEAEgBQAFgDADAAQAEAAAGADQAFACACADQADAFABADQABAFAAAGIAAADIgkAAIABAGQABAEACACIAFAEQADACAEAAQAFAAADgDIAGgEIAFADIgEAGIgGADQgFACgFAAQgGAAgEgCgAjkgSQgEACgBADIgDAFIAAAFIAaAAIAAgBIgBgHIgEgGQgEgCgEAAQgDAAgCABgAFCAbIAAgiQAAgEgBgDIgEgEIgGgBIgGACIgFAEIgCADIAAAlIgJAAIAAg1IAJAAIAAAIIABgBQABgDAFgCQAFgDAEAAIAHABIAGAEIADAGIABAJIAAAigACcAbIAAg1IAJAAIAAA1gACDAbIAAhLIAJAAIAABLgABrAbIAAhLIAJAAIAABLgABYAbIgHgTIgeAAIgHATIgJAAIAbhHIAIAAIAcBHgAA2AAIAYAAIgMgggAhaAbIAAg1IAJAAIAAAGQADgDACgBQAEgDADAAIAFABIgBAJIgCgBIgCAAIgGABIgEADIgCAEIAAAlgAkNAbIABg5IgXA5IgHAAIgYg6IABA6IgJAAIAAhHIAMAAIAXA6IAYg6IAMAAIAABHgACcgkIgBgDIABgFQABAAAAAAQAAAAABgBQAAAAABAAQABAAAAAAQABAAABAAQABAAAAAAQABABAAAAQAAAAAAAAIACAFQAAAAAAAAQAAABgBAAQAAABAAAAQAAABgBAAQAAAAAAABQAAAAgBAAQAAAAgBAAQgBAAgBAAQAAAAgBAAQgBAAAAAAQgBAAAAAAQAAgBgBAAg");
	this.shape_235.setTransform(68.875,228.5);

	this.shape_236 = new cjs.Shape();
	this.shape_236.graphics.f("#000000").s().p("ABZAqIADgFIABgEIABgNIAJAAIAAAHQAAAEgDAGQgCAFgEADgADPAeQgFgCgDgEQgEgFgBgEQgBgEAAgGIAAgBIABgKQABgDAEgFQADgEAFgCQAGgCAEAAQAEAAAGACQAFACADAEIAFAIIABAKIAAABQAAAGgBAEIgFAJQgDAEgFACQgGACgEAAQgEAAgGgCgADSgNQgDABgBADIgDAGIgBAHIAAABIABAIQABADACACQABAEADABQADABAEAAQAEAAADgBIAEgFIADgFIABgIIAAgBIgBgHIgDgGIgFgEQgCgCgEAAQgEAAgDACgACSAeQgGgEgCgDQgDgGAAgGIAKAAQAAAEABADQACAEADABIAHABQADAAADgBIAFgFQACgDAAgFIAAgyIAJAAIAAAyQAAAHgDAFQgDAFgFADQgFACgGAAQgGAAgGgCgAAyAeQgFgEgCgDQgDgEAAgEIAJAAQAAACACAEQADACACABIAGAAIAGAAIAEgDQAAgBAAAAQABgBAAAAQAAgBAAAAQAAgBAAgBIgBgDIgDgDQgDgCgFgBIgIgBIgGgEIgEgDQgBgCAAgEIABgGIAEgFIAGgDQAEgBAFAAQAGAAAFACQAEACACAEQADADAAAFIgJAAIgCgEIgDgDQgCgCgEAAIgHABIgDADIgBAEIAAADIACACIAEABIARAFQAEACACADQACACAAAFQAAAEgBADQgBACgDACQgDADgEABQgDABgFAAQgGAAgGgCgAhKAeQgFgDgDgDQgDgCgCgGQgCgFAAgFIAAgCQAAgEACgHQADgGADgCQADgEAEgBQAEgCAFAAQAGAAAEACQAFADABACQAEAEAAAEQACAFAAAFIAAAEIgkAAIABAGQABAEACACIAFAEQADABADAAQAFAAAEgBIAGgGIAFAFIgEAEIgHAFQgDABgGAAQgGAAgEgCgAhHgNQgCAAgCADQgDADAAAEIgBADIAbAAIAAgBIgCgGIgEgGQgEgCgDAAQgDAAgDACgAilAfQgDgCgCgDQgCgEAAgFIAAgfIgJAAIAAgHIAJAAIAAgOIAKAAIAAAOIAKAAIAAAHIgKAAIAAAfIAAAFIADACIACAAIADAAIACAAIAAAHIgHABQgEAAgCgBgAjGAfQgDgCgCgDQgCgDAAgGIAAgfIgJAAIAAgHIAJAAIAAgOIAKAAIAAAOIAKAAIAAAHIgKAAIAAAfIAAAFIADACIACAAIADAAIACAAIAAAHIgHABQgEAAgCgBgAkAAeQgEgCgCgEQgCgEAAgEQAAgFABgDQACgDADgCQADgCAFgBIATgBIAAgDQAAgEgCgCQAAgCgDgCIgHgBIgGABIgEADIgBAEIgJAAIABgFIAFgGIAGgDQAEgBAFAAQAGAAAEACQAFACACAEQADADAAAHIAAAXIAAAGIACAFIAAABIgKAAIgBgGIgBABIgGAFQgEABgEAAQgFAAgFgCgAj2AGIgFABIgDADIgBAFIABAEQAAABABABQAAAAAAABQABAAAAAAQABAAAAABQADABADAAQAFAAACgCIAGgEIABgCIAAgLgAFVAfIAAgiQAAgEgBgDIgEgDIgGgBIgGABIgFADIgCAFIAAAkIgJAAIAAg0IAJAAIAAAHIAAgBQADgEAEgBQAEgCAFAAIAHABIAGADIADAGIABAJIAAAigAEdAfIAAgiIgBgHIgDgDIgGgBIgGABIgFADIgCAEIAAAlIgJAAIAAhLIAJAAIAAAdQADgEAEgBQADgCAFAAIAIABIAFADQADADAAADQACAEAAAFIAAAigAAKAfIgMgoIgNAoIgHAAIgPg0IAJAAIAKAmIANgmIAGAAIANAnIAKgnIAJAAIgQA0gAhtAfIAAgiQAAgEgBgDIgEgDIgGgBIgGABIgFADIgCAFIAAAkIgJAAIAAhLIAJAAIAAAdQADgEAEgBQAEgCAFAAIAHABIAGADQACADABADQABAEAAAFIAAAigAkgAfIABg6IgXA6IgHAAIgYg6IABA6IgJAAIAAhHIAMAAIAXA5IAYg5IAMAAIAABHg");
	this.shape_236.setTransform(70.775,195.55);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_236},{t:this.shape_235},{t:this.shape_234},{t:this.shape_233},{t:this.shape_232},{t:this.shape_231},{t:this.shape_230},{t:this.shape_229},{t:this.shape_228},{t:this.shape_227},{t:this.shape_226},{t:this.shape_225},{t:this.shape_224},{t:this.shape_223},{t:this.shape_222},{t:this.shape_221},{t:this.shape_220},{t:this.shape_219},{t:this.shape_218},{t:this.shape_217},{t:this.shape_216},{t:this.shape_215},{t:this.shape_214},{t:this.shape_213},{t:this.shape_212},{t:this.shape_211},{t:this.shape_210},{t:this.shape_209},{t:this.shape_208},{t:this.shape_207},{t:this.shape_206},{t:this.shape_205},{t:this.shape_204},{t:this.shape_203},{t:this.shape_202},{t:this.shape_201},{t:this.shape_200},{t:this.shape_199},{t:this.shape_198},{t:this.shape_197},{t:this.shape_196},{t:this.shape_195},{t:this.shape_194},{t:this.shape_193},{t:this.shape_192},{t:this.shape_191},{t:this.shape_190},{t:this.shape_189},{t:this.shape_188},{t:this.shape_187},{t:this.shape_186},{t:this.shape_185},{t:this.shape_184},{t:this.shape_183},{t:this.shape_182},{t:this.shape_181},{t:this.shape_180},{t:this.shape_179},{t:this.shape_178},{t:this.shape_177},{t:this.shape_176},{t:this.shape_175},{t:this.shape_174},{t:this.shape_173},{t:this.shape_172},{t:this.shape_171},{t:this.shape_170},{t:this.shape_169},{t:this.shape_168},{t:this.shape_167},{t:this.shape_166},{t:this.shape_165},{t:this.shape_164},{t:this.shape_163},{t:this.shape_162},{t:this.shape_161},{t:this.shape_160},{t:this.shape_159},{t:this.shape_158},{t:this.shape_157},{t:this.shape_156},{t:this.shape_155},{t:this.shape_154},{t:this.shape_153},{t:this.shape_152},{t:this.shape_151},{t:this.shape_150},{t:this.shape_149},{t:this.shape_148},{t:this.shape_147},{t:this.shape_146},{t:this.shape_145},{t:this.shape_144},{t:this.shape_143},{t:this.shape_142},{t:this.shape_141},{t:this.shape_140},{t:this.shape_139},{t:this.shape_138},{t:this.shape_137},{t:this.shape_136},{t:this.shape_135},{t:this.shape_134},{t:this.shape_133},{t:this.shape_132},{t:this.shape_131},{t:this.shape_130},{t:this.shape_129},{t:this.shape_128},{t:this.shape_127},{t:this.shape_126},{t:this.shape_125},{t:this.shape_124},{t:this.shape_123},{t:this.shape_122},{t:this.shape_121},{t:this.shape_120},{t:this.shape_119},{t:this.shape_118},{t:this.shape_117},{t:this.shape_116},{t:this.shape_115},{t:this.shape_114},{t:this.shape_113},{t:this.shape_112},{t:this.shape_111},{t:this.shape_110},{t:this.shape_109},{t:this.shape_108},{t:this.shape_107},{t:this.shape_106},{t:this.shape_105},{t:this.shape_104},{t:this.shape_103},{t:this.shape_102},{t:this.shape_101},{t:this.shape_100},{t:this.shape_99},{t:this.shape_98},{t:this.shape_97},{t:this.shape_96},{t:this.shape_95},{t:this.shape_94},{t:this.shape_93},{t:this.shape_92},{t:this.shape_91},{t:this.shape_90},{t:this.shape_89},{t:this.shape_88},{t:this.shape_87},{t:this.shape_86},{t:this.shape_85},{t:this.shape_84},{t:this.shape_83},{t:this.shape_82},{t:this.shape_81},{t:this.shape_80},{t:this.shape_79},{t:this.shape_78},{t:this.shape_77},{t:this.shape_76},{t:this.shape_75},{t:this.shape_74},{t:this.shape_73},{t:this.shape_72},{t:this.shape_71},{t:this.shape_70},{t:this.shape_69},{t:this.shape_68},{t:this.shape_67},{t:this.shape_66},{t:this.shape_65},{t:this.shape_64},{t:this.shape_63},{t:this.shape_62},{t:this.shape_61},{t:this.shape_60},{t:this.shape_59},{t:this.shape_58},{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(115));

	// shkala
	this.instance = new lib.shkala();
	this.instance.setTransform(127.15,114.1,1.0206,1,0,0,0,-0.1,31.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(81).to({_off:false},0).wait(1).to({regX:0,scaleX:10.7526,x:126.8},31,cjs.Ease.cubicOut).wait(2));

	// Layer_5
	this.instance_1 = new lib.Symbol15();
	this.instance_1.setTransform(193.5,151.8,1,1,0,0,0,193.5,151.8);
	this.instance_1.shadow = new cjs.Shadow("rgba(252,217,217,1)",7,7,30);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(115));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-25,-25,455,371);


(lib.Symbol5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_4
	this.instance = new lib.Symbol14();
	this.instance.setTransform(326.5,263.2,0.101,0.101,0,0,0,98.5,73.8);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(129).to({_off:false},0).wait(1).to({regX:98.4,regY:57.1,scaleX:0.2283,scaleY:0.2283,x:326.45,y:230.7},0).wait(1).to({scaleX:0.3354,scaleY:0.3354,y:204.8},0).wait(1).to({scaleX:0.414,scaleY:0.414,y:185.8},0).wait(1).to({regX:98.5,regY:73.9,scaleX:0.4682,scaleY:0.4682,y:180.5},0).to({regX:98.4,regY:73.5,scaleX:0.5694,scaleY:0.5694,x:326.5,y:257.15},4,cjs.Ease.cubicOut).wait(22).to({scaleX:0.6643,scaleY:0.6643,x:326.45,y:239.15},3,cjs.Ease.cubicOut).to({regX:98.5,scaleX:0.1162,scaleY:0.1162,y:264.25,alpha:0},7,cjs.Ease.cubicInOut).to({_off:true},1).wait(166));

	// Layer_8
	this.instance_1 = new lib.Symbol8();
	this.instance_1.setTransform(635.05,342.65,1,1,0,0,0,19.7,17.2);
	this.instance_1.alpha = 0;
	this.instance_1.shadow = new cjs.Shadow("rgba(255,201,201,1)",14,14,30);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(69).to({_off:false},0).to({x:259.45,y:204,alpha:1},11,cjs.Ease.quadInOut).to({scaleX:0.808,scaleY:0.808},2).to({x:392.45},30,cjs.Ease.cubicOut).wait(3).to({x:552.45,y:356,alpha:0},13,cjs.Ease.cubicIn).to({_off:true},1).wait(207));

	// Symbol_1
	this.instance_2 = new lib.Symbol1();
	this.instance_2.setTransform(218.65,195.7,0.09,0.09,120.0004,0,0,3.2,144.5);
	this.instance_2.shadow = new cjs.Shadow("rgba(255,201,201,1)",7,7,30);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(54).to({_off:false},0).to({regX:2.8,regY:144.8,scaleX:1,scaleY:1,rotation:0,y:195.6},12,cjs.Ease.cubicOut).wait(246).to({rotation:-29.9992,x:228.6,y:235.6,alpha:0},23,cjs.Ease.elasticInOut).wait(1));

	// Layer_2
	this.instance_3 = new lib.Symbol7();
	this.instance_3.setTransform(238.15,260.2,0.1685,0.1685,0,0,0,211.2,105.9);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(22).to({_off:false},0).to({scaleX:1,scaleY:1,y:317.7,alpha:1},29,cjs.Ease.elasticInOut).wait(131).to({alpha:0},15).to({_off:true},1).wait(138));

	// Symbol_4
	this.instance_4 = new lib.Symbol4();
	this.instance_4.setTransform(316.55,300.35,0.0296,0.0296,0,0,0,33.8,33.8);
	this.instance_4.shadow = new cjs.Shadow("rgba(252,217,217,1)",7,7,30);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(26).to({_off:false},0).to({regY:33.7,scaleX:1,scaleY:1,x:399.4,y:396.6},29,cjs.Ease.elasticInOut).wait(107).to({alpha:0},19,cjs.Ease.cubicIn).to({_off:true},1).wait(154));

	// Symbol_3
	this.instance_5 = new lib.Symbol3();
	this.instance_5.setTransform(204.75,157.3,0.1281,0.1281,0,0,0,40.6,40.6);
	this.instance_5.alpha = 0;
	this.instance_5.shadow = new cjs.Shadow("rgba(252,217,217,1)",7,7,30);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(26).to({_off:false},0).to({scaleX:1,scaleY:1,x:509.3,y:225.15,alpha:1},29,cjs.Ease.elasticInOut).wait(107).to({alpha:0},19,cjs.Ease.cubicIn).to({_off:true},1).wait(154));

	// Symbol_2
	this.instance_6 = new lib.Symbol2();
	this.instance_6.setTransform(222.15,287.85,0.1363,0.1363,0,0,0,33.8,33.8);
	this.instance_6.alpha = 0;
	this.instance_6.shadow = new cjs.Shadow("rgba(252,217,217,1)",7,7,30);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(26).to({_off:false},0).to({regY:33.7,scaleX:1,scaleY:1,x:92.65,y:271.7,alpha:1},29,cjs.Ease.elasticInOut).wait(107).to({alpha:0},19,cjs.Ease.cubicIn).to({_off:true},1).wait(154));

	// _Clip_Group_
	this.instance_7 = new lib.ClipGroup();
	this.instance_7.setTransform(251.2,225.05,0.0145,0.0145,0,0,0,134.9,131.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({regX:136.2,regY:132.4,scaleX:1,scaleY:1,y:225},29,cjs.Ease.elasticInOut).wait(131).to({regX:136.3,regY:132.2,scaleX:0.1236,scaleY:0.1236,x:251.25,y:225.05},20,cjs.Ease.elasticIn).to({_off:true},1).wait(155));

	// Layer_3
	this.instance_8 = new lib.Symbol9();
	this.instance_8.setTransform(222.4,176,1,1,12.7378,0,0,271.4,224.2);
	this.instance_8.alpha = 0;
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(181).to({_off:false},0).to({regY:224.3,rotation:0,x:222.45,y:251.05,alpha:1},15,cjs.Ease.elasticOut).wait(98).to({rotation:-18.4374,x:276.7,y:348.15,alpha:0},23,cjs.Ease.elasticIn).to({_off:true},1).wait(18));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-60.8,-126.2,810.0999999999999,750.7);


// stage content:
(lib.index = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	this.isSingleFrame = false;
	// timeline functions:
	this.frame_0 = function() {
		if(this.isSingleFrame) {
			return;
		}
		if(this.totalFrames == 1) {
			this.isSingleFrame = true;
		}
		this.clearAllSoundStreams();
		 
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1));

	// Symbol_5
	this.instance = new lib.Symbol5();
	this.instance.setTransform(923.3,493.75,1,1,0,0,0,241.2,198.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_5
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFF7F6").s().p("EhpRBHvQh8AAhYhYQgQgRgOgRQg6hOAAhkMAAAiGFQAAh8BYhYQBYhYB8AAMDSjAAAQB8AABYBYQBUBUAEB2IAAAHMAAACGQQgDB3hVBVQhYBYh8AAg");
	this.shape.setTransform(962.675,520.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(1218.9,601.6,447.5999999999999,378.19999999999993);
// library properties:
lib.properties = {
	id: '44A05C149026C04ABB00635895BE4925',
	width: 1920,
	height: 1080,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/tylernixPQeoQdkU9jQunsplash1.jpg", id:"tylernixPQeoQdkU9jQunsplash1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['44A05C149026C04ABB00635895BE4925'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;