var flowControl = {None : 0, Low : 1, Medium : 2, High : 4};
var faucetWaterTemperature = { Notset : 0, Cold : 1, Warm : 2};

(function(Water, undefined){
	var waterTemperature = faucetWaterTemperature.NotSet;
	var quantity;
	Water.WaterTemperature = waterTemperature;
	Water.Quantity = quantity;
	Water.setQuantity = setQuantity

	function setQuantity(newValue){
		this.quantity = newValue;
	}

	Water.getQuantity = function(){
		return this.quantity;
	}

	Water.add = function(quantity){
		this.quantity += quantity;
	}
})(window.Water = window.Water || {});


(function(WaterFactory, undefined){
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
})(window.WaterFactory = window.WaterFactory || {});

(function(WaterSource, undefined){
	WaterSource.WarmWaterSource = function(){
		WaterSource.WarmWaterSource.Create = function(){
			return Faucet.WarmWaterFaucet.getInstance;
		}
	}

	WaterSource.ColdWaterSource = function(){
		WaterSource.ColdWaterSource.Create = function(){
			return Faucet.ColdWaterFaucet.getInstance;
		}
	}
})(window.WaterSource = window.WaterSource || {});

(function(Faucet, undefined){
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

})(window.Faucet = window.Faucet || {});

(function(Faucet, undefined){
	
	Faucet.ColdWaterFaucet = function(){
		var instance = null;

		function constructor(){
			return{
				Faucet.ColdWaterFaucet.getWater = function(quantity){
				var water = Faucet.getWater(quantity);
				water.WaterTemperature = faucetWaterTemperature.Cold;
				return water;
				}
			}
		}
		return{
			getInstance = function(){
				if (!instance){
					instance = constructor();
				}
				return instance;
			}
		}		
	}

})(window.Faucet = window.Faucet || {});

(function(Faucet, undefined){

	Faucet.WarmWaterFaucet = function(){
		var instance = null;

		function constructor(){
			return{
				Faucet.WarmWaterFaucet.getWater = function(quantity){
				var water = Faucet.getWater(quantity);
				water.WaterTemperature = faucetWaterTemperature.Warm;
				return water;
				}
			}
		}
		return{
			getInstance = function(){
				if (!instance){
					instance = constructor();
				}
				return instance;
			}
		}	
	}
}(window.Faucet = window.Faucet || {});