var flowControl = {None : 0, Low : 1, Medium : 2, High : 4};
var faucetWaterTemperature = { Notset : 0, Cold : 1, Warm : 2};

function Water(){
	var waterTemperature = faucetWaterTemperature.NotSet;
	var quantity;
	Water.WaterTemperature = waterTemperature;
	Water.Quantity = quantity;
	Water.setQuantity = function(newValue){
		this.quantity = newValue;
	}

	Water.getQuantity = function(){
		return this.quantity;
	}

	Water.add = function(quantity){
		this.quantity += quantity;
	}
}


function WaterFactory(){
	WaterFactory.getColdWater = function(quantity){
		return getFaucet(getWaterSource(faucetWaterTemperature.Cold)).getWater(quantity);
	}

	WaterFactory.getWarmWater = function(quantity){
		return getFaucet(getWaterSource(faucetWaterTemperature.Warm)).getWater(quantity);
	}

	WaterFactory.getFaucet = function(waterSource){
		return waterSource.Create();
	}

	WaterFactory.getWaterSource = function(temperature){
		if (temperature == faucetWaterTemperature.Cold){
			return createColdWaterSource();
		}
		else{
			return createWarmWaterSource();
		}
	}

	var createColdWaterSource = function(){
		return new ColdWaterSource();
	}

	var createWarmWaterSource = function(){
		return new WarmWaterSource();
	}
}

function WarmWaterSource(){
	WaterSource.WarmWaterSource.Create = function(){
		return new WarmWaterFaucet();
	}
}

function ColdWaterSource(){

	WaterSource.ColdWaterSource.Create = function(){
		return new ColdWaterFaucet();
	}
	
}

function Faucet()){
	var flow = flowControl.None;
	Faucet.Flow = flow;
	Faucet.open = function(flow){
		this.flow = flow;
	}

	Faucet.close = function(){
		this.flow = flowControl.None;
	}

	Faucet.getWater = function(quantity){
		var water = new Water();
		startFlow();
		while(water.Quantity < quantity){
			water.add(this.Flow);
		}
		stopFlow();
		return water;
	}

	var startFlow = function(){
		open(FlowControl.Low);
	}

	var stopFlow = function(){
		close();
	}

}

function ColdWaterFaucet(){
	var instance = null;

	function constructor(){
		return{
			this.prototype = new Faucet();
			this.getWater = function(quantity){
				var water = this.prototype.getWater(quantity);
				alert("sub");
				water.WaterTemperature = faucetWaterTemperature.Cold;
				return water;
			}
		}
	}
	return{
		getInstance = function(){
			if(!instance){
				instance = constructor();
			}
			return instance;
		}
	}
}

function WarmWaterFaucet(){
	var instance = null;

	function constructor(){
		return{
			this.prototype = new Faucet();
			this.getWater = function(quantity){
				var water = this.prototype.getWater(quantity);
				alert("sub");
				water.WaterTemperature = faucetWaterTemperature.Warm;
				return water;
			}
		}
	}
	return{
		getInstance = function(){
			if(!instance){
				instance = constructor();
			}
			return instance;
		}
	}
}